Class = {
  $isClass: true,
  $className: "Class",
  __isInstance__: function(object) {
    return typeof object === "function" && !!object.$isClass;
  }
};
Vector$object = Array;

AS3 = {
  // function assert(cond : Object, file : String, line : uint, column : uint) : void
  assert: function (cond, file, line, column) {
    if (!cond)
      throw new Error(file+"("+line+":"+column+"): assertion failed");
  },
  bind: function bind(object, boundMethodName) {
    var method = object[boundMethodName];
    if (object.hasOwnProperty(boundMethodName)) {
      return method;
    }
    var boundMethod = method.bind(object);
    Object.defineProperty(object, boundMethodName, {
      writable: true,    // TODO: for backwards-compatibility only
      value: boundMethod
    });
    return boundMethod;
  },
  is: function (object, type) {
    if (!type || object === undefined || object === null) {
      return false;
    }
    if (Ext.isFunction(type.__isInstance__)) {
      return type.__isInstance__(object);
    }
    if (!Ext.isFunction(type)) {
      return false;
    }
    // constructor or instanceof may return false negatives:
    if (object.constructor === type || object instanceof type) {
      return true;
    }
    // special case for special observables, e.g. classes:
    if (object.isObservable && (type.$className === "Ext.mixin.Observable" || type.$className === "Ext.util.Observable")) {
      return true;
    }

    if (typeof object === 'object') {
      var objectType;
      if (object.isInstance) {
        objectType = object.self;
      } else {
        var typeName = object.xclass || object.xtype && Ext.ClassManager.getNameByAlias("widget." + object.xtype);
        if (typeName) {
          objectType = Ext.ClassManager.get(typeName);
        }
      }
      if (AS3.isAssignableFrom(type, objectType)) {
        return true;
      }
    }
    return false;
  },
  isAssignableFrom: function(type, clazz) {
    if (!type || !clazz) {
      return false;
    }
    if (type === clazz) {
      return true;
    }
    if (clazz.prototype instanceof type) {
      return true;
    }
    if (type.$className) {
      var mixins = clazz.prototype.mixins;
      if (Ext.isObject(mixins)) {
        if (mixins[type.$className]) {
          return true;
        }
        if (type.prototype.mixinId && mixins[type.prototype.mixinId]) {
          return true;
        }
      }
    }
    return false;
  },
  as: function (object, type) {
    return AS3.is(object, type) ? object : null;
  },
  cast: function (type, value) {
    if (value === undefined || value === null) {
      return value;
    }
    var typePrototype = type.prototype;
    if (type.$className && typePrototype &&
            typeof value === "object" && !value.isInstance && !value.xclass && !value.xtype) {
      if (typePrototype.hasOwnProperty("xtype") && typePrototype.xtype) {
        value.xtype = typePrototype.xtype;
      } else if (typePrototype.hasOwnProperty("type") && typePrototype.type) {
        value.type = typePrototype.type;
      }
      value.xclass = type.$className;
    } else if (!AS3.is(value, type)) {
      throw new TypeError("Value cannot be cast to " + Ext.getClassName(type) + ": " + value);
    }
    return value;
  },
  getBindable: function (object, property) {
    if (object.isInstance) {
      var getterName = this._checkConfig(object, property, "get");
      if (getterName) {
        return object[getterName]();
      }
      return object.getConfig(property);
    } else {
      return object[property];
    }
  },
  setBindable: function (object, property, value) {
    if (object.isInstance) {
      var setterName = this._checkConfig(object, property, "set");
      if (setterName) {
        object[setterName](property, value);
      } else {
        object.setConfig(property, value);
      }
    } else {
      object[property] = value;
    }
    return value;
  },
  _checkConfig: function(object, property, accessPrefix) {
    if (!Ext.Config.map[property]) {
      var accessorName = accessPrefix + Ext.String.capitalize(property);
      this.trace("[WARN]", "AS3." + accessPrefix + "Bindable() called on " + Ext.getClassName(object) + "#" + property +
              ", which is not registered as a config. Still using method " + accessorName + "().");
      return accessorName;
    }
    return null;
  }
};