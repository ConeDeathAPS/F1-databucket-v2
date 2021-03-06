"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ApiRequest =
/*#__PURE__*/
function () {
  function ApiRequest(urlFragment, pageSize, pageOffset) {
    _classCallCheck(this, ApiRequest);

    this.requestUrl = "http://ergast.com/api/f1/".concat(urlFragment, ".json?limit=").concat(pageSize || 999).concat(typeof pageOffset !== 'undefined' ? "&offset=".concat(pageOffset) : '');
  }

  _createClass(ApiRequest, [{
    key: "send",
    value: function send() {
      var _this = this;

      var req = new Request(this.requestUrl, {
        method: 'GET'
      });
      return fetch(req).then(function (res) {
        return res.json();
      }).catch(function (err) {
        console.error("An error occurred with the following request http://ergast.com/api/f1/".concat(_this.requestUrl), err);
        return Promise.reject(err);
      });
    }
  }]);

  return ApiRequest;
}();