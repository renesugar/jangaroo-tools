// function assert(cond : Object, file : String, line : uint, column : uint) : void
define("as3/assert", function() {
  function assert(cond, file, line, column) {
    if (!cond)
      throw new Error(file+"("+line+":"+column+"): assertion failed");
  }
  return assert;
});