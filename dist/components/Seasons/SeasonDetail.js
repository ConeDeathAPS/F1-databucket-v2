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

var SeasonDetail =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SeasonDetail, _React$Component);

  function SeasonDetail(props) {
    _classCallCheck(this, SeasonDetail);

    return _possibleConstructorReturn(this, _getPrototypeOf(SeasonDetail).call(this, props));
  }

  _createClass(SeasonDetail, [{
    key: "render",
    value: function render() {
      console.log('this.props.season:', this.props.activeSeason);
      var races;

      if (this.props.activeSeason) {
        races = this.props.activeSeason.Races.map(function (race) {
          return React.createElement("article", {
            className: "raceRow",
            id: "".concat(race.season, "-").concat(race.round),
            key: race.round
          }, React.createElement("p", null, React.createElement("b", null, "Round ", race.round), "\xA0-\xA0"), React.createElement("a", {
            href: race.url,
            target: "_blank"
          }, race.raceName));
        });
      }

      return React.createElement("div", {
        id: "seasonDetail"
      }, this.props.activeSeason ? React.createElement(React.Fragment, null, React.createElement("h2", null, this.props.activeSeason.season), React.createElement("section", {
        id: "seasonRoundsList"
      }, races)) : React.createElement("h2", null, "Dont have season!"));
    }
  }]);

  return SeasonDetail;
}(React.Component);