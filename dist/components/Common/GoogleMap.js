"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var GoogleMap =
/*#__PURE__*/
function (_React$Component) {
  _inherits(GoogleMap, _React$Component);

  function GoogleMap(props) {
    var _this;

    _classCallCheck(this, GoogleMap);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GoogleMap).call(this, props));
    _this.state = {
      location: {
        center: {
          lat: undefined,
          lng: undefined
        },
        zoom: 13
      }
    };
    return _this;
  }

  _createClass(GoogleMap, [{
    key: "onMapInit",
    value: function onMapInit() {
      if (!this.props.mapProps) {
        console.error('Invalid map properties found:', this.props.mapProps);
        return false;
      }

      var map = new google.maps.Map(document.getElementById('map'), {
        center: {
          lat: this.state.race.Circuit.Location.lat,
          lng: this.state.race.Circuit.Location.long
        },
        zoom: 12
      });
    }
  }, {
    key: "onMapLocationChange",
    value: function onMapLocationChange(locObj) {
      if (!locObj.center || !locObj.center.lat || !locObj.center.lng || !locObj.zoom) {
        console.error('Invalid locationObject provided');
        return false;
      }

      this.setState({
        location: locObj
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", {
        id: "gMap"
      });
    }
  }]);

  return GoogleMap;
}(React.Component);