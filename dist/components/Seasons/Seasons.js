"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var Seasons =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Seasons, _React$Component);

  function Seasons(props) {
    var _this;

    _classCallCheck(this, Seasons);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Seasons).call(this, props));
    _this.state = {
      season: undefined,
      activeSeason: undefined
    };
    _this.onSeasonSelect = _this.onSeasonSelect.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.fetchSeasonData = _this.fetchSeasonData.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Seasons, [{
    key: "onSeasonSelect",
    value: function onSeasonSelect(season) {
      var _this2 = this;

      this.setState({
        season: season
      }, function () {
        _this2.fetchSeasonData();
      });
    }
  }, {
    key: "fetchSeasonData",
    value: function fetchSeasonData() {
      var _this3 = this;

      this.setState({
        loading: true
      });

      if (isNaN(this.state.season) || this.state.season.length !== 4) {
        console.error("Invalid season \"".concat(this.state.season, "\". Must be a 4 digit year."));
        return Promise.reject("Invalid season \"".concat(this.state.season, "\". Must be a 4 digit year."));
      }

      var apiReq = new ApiRequest(this.state.season);
      apiReq.send().then(function (seasonResponse) {
        console.log('Season response:', seasonResponse);

        _this3.setState({
          activeSeason: seasonResponse.MRData.RaceTable,
          loading: false
        });
      }).catch(function (err) {
        console.error('Error while getting all seasons:', err);
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("main", {
        id: "seasons"
      }, React.createElement(SeasonList, {
        onSeasonSelect: this.onSeasonSelect
      }), React.createElement(SeasonDetail, {
        activeSeason: this.state.activeSeason
      }));
    }
  }]);

  return Seasons;
}(React.Component);