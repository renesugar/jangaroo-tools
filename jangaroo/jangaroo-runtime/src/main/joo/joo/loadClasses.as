/*
 * Copyright 2013 CoreMedia AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); 
 * you may not use this file except in compliance with the License. 
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0 
 *
 * Unless required by applicable law or agreed to in writing, 
 * software distributed under the License is distributed on an "AS
 * IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either 
 * express or implied. See the License for the specific language 
 * governing permissions and limitations under the License.
 */
package joo {

[Native(amd)]
/**
 * @param qualifiedName an array of qualified names for which to load the corresponding classes
 * @param callback the function to call with one parameter for each class, in the same order as in
 *   <code>qualifiedNames</code>, as soon as all are loaded
 */
public native function loadClasses(qualifiedNames: Array, callback: Function):void;


}