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

var RaceResults =
/*#__PURE__*/
function (_React$Component) {
  _inherits(RaceResults, _React$Component);

  function RaceResults(props) {
    var _this;

    _classCallCheck(this, RaceResults);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RaceResults).call(this, props));
    _this.state = {
      results: undefined,
      race: {
        year: _this.props.race.season,
        round: _this.props.race.round
      }
    };
    return _this;
  }

  _createClass(RaceResults, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (!this.state.race || !this.state.race.year || !this.state.race.round) {
        console.error('Invalid race properties provided:', this.state.race);
        return;
      }

      var urlFragment = "".concat(this.state.race.year, "/").concat(this.state.race.round, "/results");
      var apiReq = new ApiRequest(urlFragment, 30, 0);
      apiReq.send().then(function (results) {
        _this2.setState({
          results: results.MRData.RaceTable.Races[0]
        });
      }).catch(function (err) {
        console.error('Error while fetching race results:', err);
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {}
  }, {
    key: "render",
    value: function render() {
      console.log('Results:', this.state.results);
      var races;

      if (this.state.results) {
        races = this.state.results.Results.map(function (pos) {
          return React.createElement(RacePosition, {
            position: pos,
            key: pos.position
          });
        });
      }

      return React.createElement("div", {
        id: "raceDetail"
      }, this.state.results ? React.createElement(React.Fragment, null, React.createElement("header", null, React.createElement("h2", null, this.state.results.raceName), React.createElement("p", null, "Round ", this.state.results.round, " - ", new Date(this.state.results.date).toLocaleDateString())), React.createElement("div", {
        id: "positionRow"
      }, races)) : React.createElement("h3", null, "Race Results"));
    }
  }]);

  return RaceResults;
}(React.Component);