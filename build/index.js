(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

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

  function searchParamsArr(str) {
      if (str.indexOf('=') === -1) return false;

      var paramsArr = [];
      if (str.indexOf('?') !== -1) {
          var paramsStr = str.split('?')[1];
          paramsArr = paramsStr.split('&');
      } else {
          paramsArr = str.split('&');
      }

      return paramsArr;
  }

  function searchParamsObj(str) {
      var obj = {};
      var paramsArr = searchParamsArr(str);

      for (var i = 0; i < paramsArr.length; i++) {
          var paramArr = paramsArr[i].split('=');
          obj[paramArr[0]] = paramsArr[1];
      }

      return obj;
  }

  var SearchParams = function () {
      function SearchParams(str) {
          classCallCheck(this, SearchParams);

          this.str = str || "";
      }

      createClass(SearchParams, [{
          key: 'has',
          value: function has(key) {
              var obj = searchParamsObj(this.str);
              return obj[key] != null;
          }
      }, {
          key: 'get',
          value: function get(key) {
              var value = '';
              var arr = searchParamsArr(this.str);

              for (var i = 0; i < arr.length; i++) {
                  var k = key + '=';
                  if (arr[i].indexOf(k) !== -1) {
                      value = arr[i].split(k)[1] || '';
                      break;
                  }
              }
              return value;
          }
      }, {
          key: 'getAll',
          value: function getAll(key) {
              var values = [];
              var arr = searchParamsArr(this.str);

              for (var i = 0; i < arr.length; i++) {
                  var k = key + '=';
                  if (arr[i].indexOf(k) !== -1) {
                      var value = arr[i].split(k)[1] || '';
                      values.push(value);
                  }
              }
              return values;
          }
      }, {
          key: 'append',
          value: function append(key, value) {
              this.str += '&' + key + '=' + value;
          }
      }, {
          key: 'delete',
          value: function _delete(key) {
              // this.str.replace(new RegExp(key, 'g'), '');
          }
      }, {
          key: 'entries',
          value: function entries() {
              var keysAndValsArr = [];
              var arr = searchParamsArr(this.str);

              for (var i = 0; i < arr.length; i++) {
                  var itemArr = arr[i].split('=');
                  keysAndValsArr.push([itemArr[0], itemArr[1]]);
              }
              return keysAndValsArr;
          }
      }, {
          key: 'keys',
          value: function keys() {
              var keys = [];
              var arr = searchParamsArr(this.str);

              for (var i = 0; i < arr.length; i++) {
                  var key = arr[i].split('=')[0] || '';
                  keys.push(key);
              }
              return keys;
          }
      }, {
          key: 'set',
          value: function set() {}
      }, {
          key: 'sort',
          value: function sort() {}
      }, {
          key: 'toString',
          value: function toString() {
              return this.str;
          }
      }, {
          key: 'values',
          value: function values() {}
      }]);
      return SearchParams;
  }();

  module.exports = SearchParams;

})));
