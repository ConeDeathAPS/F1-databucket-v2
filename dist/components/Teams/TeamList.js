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

var TeamList =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TeamList, _React$Component);

  function TeamList(props) {
    var _this;

    _classCallCheck(this, TeamList);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TeamList).call(this, props));
    _this.state = {
      teams: [],
      loading: true,
      totalTeams: 0,
      activeTeam: undefined,
      showingAllTeams: true,
      showingCurrentTeams: false,
      teamsFilter: undefined
    };
    return _this;
  }

  _createClass(TeamList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.fetchTeams(1, 50);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.setState({
        teams: []
      });
    }
  }, {
    key: "showAllTeams",
    value: function showAllTeams() {
      var _this2 = this;

      if (this.state.showingAllTeams) return false;
      this.setState({
        showingAllTeams: true,
        showingCurrentTeams: false
      }, function () {
        _this2.fetchTeams(1, 50);
      });
    }
  }, {
    key: "showCurrentTeams",
    value: function showCurrentTeams() {
      var _this3 = this;

      if (this.state.showingCurrentTeams) return false;
      this.setState({
        showingAllTeams: false,
        showingCurrentTeams: true
      }, function () {
        _this3.fetchTeams(1, 25);
      });
    }
  }, {
    key: "setSelectedTeam",
    value: function setSelectedTeam(team) {
      var _this4 = this;

      if (this.state.activeTeam && this.state.activeTeam.constructorId === team.constructorId) return false;
      this.setState({
        activeTeam: team
      }, function () {
        console.log('Selected team:', _this4.state.activeTeam);
      });
    }
  }, {
    key: "fetchTeams",
    value: function fetchTeams(targetPage, targetPageSize) {
      var _this5 = this;

      this.setState({
        loading: true
      });
      var safePageSize = targetPageSize;
      var safePage = (targetPage - 1) * safePageSize;
      var seasonPrefix = this.state.showingCurrentTeams ? '2018' : '';
      var apiReq = new ApiRequest("".concat(seasonPrefix.length ? "".concat(seasonPrefix, "/") : '', "constructors"), this.state.showingAllTeams ? safePageSize : 999, this.state.showingAllTeams ? safePage : 0);
      apiReq.send().then(function (constructorsResponse) {
        console.log('Teams response:', constructorsResponse.MRData);

        _this5.setState({
          teams: constructorsResponse.MRData.ConstructorTable.Constructors,
          totalTeams: parseInt(constructorsResponse.MRData.total, 10),
          loading: false
        });
      }).catch(function (err) {
        console.error('Error while getting teams:', err);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      var teams = this.state.teams.map(function (team) {
        return React.createElement("button", {
          className: _this6.state.activeTeam && _this6.state.activeTeam.constructorId === team.constructorId ? 'primary raised' : 'primary',
          onClick: function onClick() {
            return _this6.setSelectedTeam(team);
          },
          key: team.constructorId
        }, team.name);
      });
      return React.createElement("div", {
        id: "teamsList"
      }, React.createElement("section", {
        id: "headerRow"
      }, React.createElement("button", {
        className: this.state.showingAllTeams ? 'secondary raised' : 'secondary',
        onClick: function onClick() {
          return _this6.showAllTeams();
        }
      }, "All Constructors"), React.createElement("button", {
        className: this.state.showingCurrentTeams ? 'secondary raised' : 'secondary',
        onClick: function onClick() {
          return _this6.showCurrentTeams();
        }
      }, "Current Constructors"), this.state.showingAllTeams && React.createElement(Paginator, {
        totalItems: this.state.totalTeams,
        fetchItems: this.fetchTeams,
        isDisabled: this.state.loading
      })), React.createElement("section", {
        id: "teamsPage"
      }, !this.state.loading && teams.length > 1 ? teams : React.createElement("p", null, "Loading...")));
    }
  }]);

  return TeamList;
}(React.Component);