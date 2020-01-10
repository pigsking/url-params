(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.SearchParams = factory());
}(this, (function () { 'use strict';

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var iterable = !!Symbol;

  function getType(obj) {
      return Object.prototype.toString.call(obj).slice(8, -1);
  }

  function getParamsObj(params) {
      var paramsObj = {};
      var paramsArr = [];

      if (getType(params) === 'Object') {
          for (var key in params) {
              if (params.hasOwnProperty(key)) {
                  paramsObj[key] = [params[key]];
              }
          }
      }

      if (getType(params) === 'Array') {
          for (var i = 0; i < params.length; i++) {
              paramsObj[params[i][0]] = [params[i][1]];
          }
      }

      if (getType(params) === 'String') {
          if (params.indexOf('=') === -1) return false;

          if (params.indexOf('?') !== -1) {
              var paramsStr = params.split('?')[1];
              paramsArr = paramsStr.split('&');
          } else {
              paramsArr = params.split('&');
          }

          for (var _i = 0; _i < paramsArr.length; _i++) {
              var item = paramsArr[_i].split('=');
              var _key = item[0];
              var value = item[1];

              if (_key in paramsObj) {
                  paramsObj[_key].push(value);
              } else {
                  paramsObj[_key] = [value];
              }
          }
      }
      return paramsObj;
  }

  function makeIterator(arr) {
      var iterator = {
          next: function next() {
              var value = arr.shift();
              return { done: value === undefined, value: value };
          }
      };

      if (iterable) {
          iterator[Symbol.iterator] = function () {
              return iterator;
          };
      }

      return iterator;
  }

  var SearchParams = function () {
      function SearchParams(paramsStr) {
          classCallCheck(this, SearchParams);

          this.paramsStr = paramsStr || {};
          this.paramsObj = getParamsObj(this.paramsStr);
      }

      createClass(SearchParams, [{
          key: 'has',
          value: function has(key) {
              return key in this.paramsObj;
          }
      }, {
          key: 'get',
          value: function get(key) {
              return key in this.paramsObj ? this.paramsObj[key][0] : null;
          }
      }, {
          key: 'getAll',
          value: function getAll(key) {
              return key in this.paramsObj ? this.paramsObj[key] : [];
          }
      }, {
          key: 'append',
          value: function append(key, value) {
              this.paramsObj[key] = [value];
          }
      }, {
          key: 'delete',
          value: function _delete(key) {
              delete this.paramsObj[key];
          }
      }, {
          key: 'set',
          value: function set(key, value) {
              this.paramsObj[key] = [value];
              return this.paramsObj;
          }
      }, {
          key: 'keys',
          value: function keys() {
              var keys = [];
              this.forEach(function (value, key) {
                  keys.push(key);
              });
              return makeIterator(keys);
          }
      }, {
          key: 'values',
          value: function values() {
              var values = [];
              this.forEach(function (value) {
                  values.push(value);
              });
              return makeIterator(values);
          }
      }, {
          key: 'entries',
          value: function entries() {
              var keysAndValsArr = [];
              this.forEach(function (value, key) {
                  keysAndValsArr.push([key, value]);
              });
              return keysAndValsArr;
          }
      }, {
          key: 'sort',
          value: function sort() {
              // let keys = []
              // let sortObj = {}
              // const obj = this.paramsObj

              // for (let key in obj) {
              //     if (obj.hasOwnProperty(key)) {
              //         keys.push(key)
              //     }
              // }
          }
      }, {
          key: 'forEach',
          value: function forEach(fn) {
              var obj = this.paramsObj;
              Object.getOwnPropertyNames(obj).forEach(function (key) {
                  obj[key].forEach(function (value) {
                      fn(value, key);
                  });
              });
          }
      }, {
          key: 'toString',
          value: function toString() {
              var paramsArr = [];
              this.forEach(function (value, key) {
                  paramsArr.push(key + '=' + value);
              });
              return paramsArr.join('&');
          }
      }]);
      return SearchParams;
  }();

  return SearchParams;

})));
