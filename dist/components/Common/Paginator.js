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

var Paginator =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Paginator, _React$Component);

  function Paginator(props) {
    var _this;

    _classCallCheck(this, Paginator);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Paginator).call(this, props));
    _this.state = {
      pageNumber: 1,
      pageSize: 25,
      pageSizes: [10, 25, 50],
      totalItems: _this.props.totalItems,
      allPages: []
    };
    _this.getAllPages = _this.getAllPages.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onNextPage = _this.onNextPage.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onPreviousPage = _this.onPreviousPage.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onPageSizeChanged = _this.onPageSizeChanged.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.goToPage = _this.goToPage.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Paginator, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getAllPages();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {}
  }, {
    key: "getAllPages",
    value: function getAllPages() {
      var pageCount = 1;
      var totalItems = this.state.totalItems;
      var pagesArray = [];

      while (totalItems > 0) {
        pagesArray.push(pageCount);
        totalItems -= this.state.pageSize;
        pageCount += 1;
      }

      this.setState({
        allPages: pagesArray
      });
    }
  }, {
    key: "goToPage",
    value: function goToPage(page) {
      this.props.fetchSeasons(page, this.state.pageSize);
      this.setState({
        pageNumber: page
      });
    }
  }, {
    key: "onPageSizeChanged",
    value: function onPageSizeChanged(e) {
      var _this2 = this;

      this.setState({
        pageSize: parseInt(e.target.value, 10)
      }, function () {
        _this2.props.fetchSeasons(_this2.state.pageNumber, _this2.state.pageSize);

        _this2.getAllPages();
      });
    }
  }, {
    key: "onNextPage",
    value: function onNextPage(e) {
      if (!this.state.allPages[this.state.pageNumber]) e.preventDefault();
      this.props.fetchSeasons(this.state.pageNumber + 1, this.state.pageSize);
      var currentPage = this.state.pageNumber;
      this.setState({
        pageNumber: currentPage + 1
      });
    }
  }, {
    key: "onPreviousPage",
    value: function onPreviousPage(e) {
      if (this.state.pageNumber === 1) e.preventDefault();
      this.props.fetchSeasons(this.state.pageNumber - 1, this.state.pageSize);
      var currentPage = this.state.pageNumber;
      this.setState({
        pageNumber: currentPage - 1
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var allPages = this.state.allPages.map(function (page) {
        return React.createElement("button", {
          className: "secondary",
          onClick: function onClick() {
            _this3.goToPage(page);
          },
          disabled: _this3.state.pageNumber === page,
          key: page
        }, page);
      });
      var pageSizeOptions = this.state.pageSizes.map(function (size) {
        return React.createElement("option", {
          value: size,
          key: size
        }, size);
      });
      return React.createElement("section", {
        id: "pagination"
      }, React.createElement("select", {
        value: this.state.pageSize,
        onChange: this.onPageSizeChanged,
        disabled: this.props.isDisabled
      }, pageSizeOptions), React.createElement("button", {
        className: "primary icon-button",
        onClick: this.onPreviousPage,
        disabled: this.state.pageNumber === 1 || this.props.isDisabled
      }, React.createElement("i", {
        className: "material-icons"
      }, "chevron_left")), allPages, React.createElement("button", {
        className: "primary icon-button",
        onClick: this.onNextPage,
        disabled: !this.state.allPages[this.state.pageNumber] || this.props.isDisabled
      }, React.createElement("i", {
        className: "material-icons"
      }, "chevron_right")), React.createElement("p", null, this.state.totalItems, " total"));
    }
  }]);

  return Paginator;
}(React.Component);