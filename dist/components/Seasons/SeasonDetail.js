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
    var _this;

    _classCallCheck(this, SeasonDetail);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SeasonDetail).call(this, props));
    _this.state = {
      race: undefined
    };
    return _this;
  }

  _createClass(SeasonDetail, [{
    key: "onRaceSelected",
    value: function onRaceSelected(e, r) {
      if (this.state.race && this.state.race.round === r.round) e.preventDefault();
      this.setState({
        race: r
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      console.log('Rendering');
      var races;
      var selectedRaceLocation;

      if (this.props.activeSeason) {
        races = this.props.activeSeason.Races.map(function (race) {
          return React.createElement("button", {
            className: "secondary ".concat(_this2.state.race && _this2.state.race.round === race.round ? 'raised' : ''),
            id: "".concat(race.season, "-").concat(race.round),
            key: race.round,
            onClick: function onClick(e) {
              _this2.onRaceSelected(e, race);
            }
          }, race.raceName);
        });
      }

      if (this.state.race) {
        selectedRaceLocation = {
          center: {
            lat: parseFloat(this.state.race.Circuit.Location.lat),
            lng: parseFloat(this.state.race.Circuit.Location.long)
          },
          zoom: 13
        };
      }

      return React.createElement("div", {
        id: "seasonDetail"
      }, this.props.activeSeason ? React.createElement(React.Fragment, null, React.createElement("h1", null, this.props.activeSeason.season), React.createElement("div", {
        id: "seasonDetailMainRow"
      }, React.createElement("section", {
        id: "seasonRoundsList"
      }, races), React.createElement("section", {
        id: "raceMapContainer"
      }, this.state.race && selectedRaceLocation ? React.createElement(GoogleMap, {
        location: selectedRaceLocation
      }) : React.createElement("h3", null, "Select a race!")))) : React.createElement("h2", null, "Pick a season!"));
    }
  }]);

  return SeasonDetail;
}(React.Component);