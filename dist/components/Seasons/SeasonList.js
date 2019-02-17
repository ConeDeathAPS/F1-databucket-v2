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

var SeasonList =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SeasonList, _React$Component);

  function SeasonList(props) {
    var _this;

    _classCallCheck(this, SeasonList);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SeasonList).call(this, props));
    _this.state = {
      seasons: [],
      loading: true,
      totalSeasons: 0,
      yearFilter: undefined,
      activeSeason: undefined
    };
    _this.fetchSeasons = _this.fetchSeasons.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(SeasonList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.fetchSeasons(1, 50);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.setState({
        seasons: []
      });
    }
  }, {
    key: "setActiveSeason",
    value: function setActiveSeason(season) {
      var _this2 = this;

      this.setState({
        activeSeason: season
      }, function () {
        _this2.props.onSeasonSelect(_this2.state.seasons[0].season);
      });
    }
  }, {
    key: "fetchSeasons",
    value: function fetchSeasons(targetPage, targetPageSize) {
      var _this3 = this;

      this.setState({
        loading: true
      });
      var safePageSize = targetPageSize;
      var safePage = (targetPage - 1) * safePageSize;
      var apiReq = new ApiRequest('seasons', safePageSize, safePage);
      apiReq.send().then(function (seasonsResponse) {
        console.log('Seasons response:', seasonsResponse);

        _this3.setState({
          seasons: seasonsResponse.MRData.SeasonTable.Seasons,
          totalSeasons: parseInt(seasonsResponse.MRData.total, 10),
          loading: false
        }, function () {
          if (!_this3.props.activeSeason) {
            _this3.props.onSeasonSelect(_this3.state.seasons[0].season);

            _this3.setActiveSeason(_this3.state.seasons[0].season);
          }
        });
      }).catch(function (err) {
        console.error('Error while getting all seasons:', err);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var years = this.state.seasons.map(function (s) {
        return React.createElement("button", {
          className: s.season === _this4.state.activeSeason ? 'primary raised' : 'primary',
          href: s.url,
          key: s.season,
          onClick: function onClick() {
            _this4.setActiveSeason(s.season);
          }
        }, s.season);
      });
      return React.createElement("div", {
        id: "seasonsList"
      }, React.createElement("section", {
        id: "headerRow"
      }, this.state.totalSeasons > 0 && React.createElement(Paginator, {
        totalItems: this.state.totalSeasons,
        fetchItems: this.fetchSeasons,
        isDisabled: this.state.loading
      })), React.createElement("section", {
        id: "seasonsPage"
      }, years));
    }
  }]);

  return SeasonList;
}(React.Component);