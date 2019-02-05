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
      loadingState: false,
      // If true, we are loading data from the API
      currentPage: 1,
      // The current page of seasons
      pageSize: 25,
      // The size of the page
      totalSeasons: 0,
      // The total number of seasons available
      seasons: [],
      // The currently viewed array of seasons
      disallowNextPage: true,
      disallowPreviousPage: false
    };
    _this.onNextPage = _this.onNextPage.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onPreviousPage = _this.onPreviousPage.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Seasons, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.fetchSeasons();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.setState({
        seasons: []
      });
    }
  }, {
    key: "fetchSeasons",
    value: function fetchSeasons(targetPage, targetPageSize) {
      var _this2 = this;

      this.setState({
        loading: true
      });
      var safePageSize = targetPageSize || this.state.pageSize;
      var safePage = targetPage || this.state.currentPage;
      var apiReq = new ApiRequest('seasons', safePageSize, safePage);
      apiReq.send().then(function (seasonsResponse) {
        console.log('Seasons response:', seasonsResponse);

        _this2.setState({
          seasons: seasonsResponse.MRData.SeasonTable.Seasons,
          totalSeasons: seasonsResponse.MRData.SeasonTable.total,
          loading: false,
          disallowNextPage: _this2.state.currentPage + 1 * _this2.state.pageSize - _this2.state.pageSize > seasonsResponse.MRData.SeasonTable.total,
          disallowPreviousPage: _this2.state.currentPage >= 1,
          currentPage: safePage,
          pageSize: safePageSize
        });
      }).catch(function (err) {
        console.error('Error while getting all seasons:', err);
      });
    }
  }, {
    key: "onNextPage",
    value: function onNextPage() {
      if (this.state.disallowNextPage) return false;
      this.fetchSeasons(this.state.currentPage + 1);
    }
  }, {
    key: "onPreviousPage",
    value: function onPreviousPage() {
      if (this.state.disallowPreviousPage) return false;
      this.fetchSeasons(this.state.currentPage - 1);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("main", null, React.createElement("h2", null, "Seasons"), React.createElement("p", null, "Viewing page ", this.state.currentPage), React.createElement("button", {
        className: "primary raised",
        onClick: this.onPreviousPage,
        disabled: this.state.disallowPreviousPage
      }, "Previous Page"), React.createElement("button", {
        className: "primary raised",
        onClick: this.onNextPage,
        disabled: this.state.disallowNextPage
      }, "Next Page"));
    }
  }]);

  return Seasons;
}(React.Component);