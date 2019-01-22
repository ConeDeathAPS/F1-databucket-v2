'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var appContainer = document.getElementById('appComponent');

var Footer = function (_React$Component) {
	_inherits(Footer, _React$Component);

	function Footer(props) {
		_classCallCheck(this, Footer);

		var _this = _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).call(this, props));

		_this.state = {};
		return _this;
	}

	_createClass(Footer, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'footer',
				null,
				React.createElement(
					'p',
					null,
					'Version 0.1 - Check out the source on\xA0',
					React.createElement(
						'a',
						{ href: 'https://github.com/conedeathaps/F1-databucket-v2' },
						'github!'
					)
				)
			);
		}
	}]);

	return Footer;
}(React.Component);

var NavbarLink = function (_React$Component2) {
	_inherits(NavbarLink, _React$Component2);

	function NavbarLink(props) {
		_classCallCheck(this, NavbarLink);

		return _possibleConstructorReturn(this, (NavbarLink.__proto__ || Object.getPrototypeOf(NavbarLink)).call(this, props));
	}

	_createClass(NavbarLink, [{
		key: 'render',
		value: function render() {
			var _this3 = this;

			var page = this.props.page;
			var className = this.props.isActive ? 'active' : '';
			return React.createElement(
				'a',
				{
					href: '#',
					className: className,
					onClick: function onClick() {
						return _this3.props.click(page);
					} },
				page
			);
		}
	}]);

	return NavbarLink;
}(React.Component);

var Navbar = function (_React$Component3) {
	_inherits(Navbar, _React$Component3);

	function Navbar(props) {
		_classCallCheck(this, Navbar);

		var _this4 = _possibleConstructorReturn(this, (Navbar.__proto__ || Object.getPrototypeOf(Navbar)).call(this, props));

		_this4.state = {
			activeComponent: _this4.props.activeComponent
		};
		_this4.onPageClick = _this4.onPageClick.bind(_this4);
		return _this4;
	}

	_createClass(Navbar, [{
		key: 'onPageClick',
		value: function onPageClick(clickedPage) {
			this.setState({
				activeComponent: clickedPage
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this5 = this;

			var navButtons = this.props.pages.map(function (page) {
				return React.createElement(NavbarLink, {
					page: page,
					isActive: _this5.state.activeComponent === page,
					key: page,
					click: _this5.onPageClick });
			});
			return React.createElement(
				'nav',
				null,
				React.createElement(
					'h2',
					null,
					'Formula 1 Databucket'
				),
				React.createElement(
					'section',
					null,
					navButtons
				)
			);
		}
	}]);

	return Navbar;
}(React.Component);

var App = function (_React$Component4) {
	_inherits(App, _React$Component4);

	function App(props) {
		_classCallCheck(this, App);

		var _this6 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

		_this6.state = {
			activeComponent: 'Home'
		};
		return _this6;
	}

	_createClass(App, [{
		key: 'render',
		value: function render() {
			var pages = ['Home', 'Teams', 'Drivers', 'Tracks'];
			return React.createElement(
				'div',
				{ id: 'componentContainer' },
				React.createElement(Navbar, { activeComponent: this.state.activeComponent, pages: pages }),
				React.createElement(
					'main',
					null,
					React.createElement(
						'h1',
						null,
						'Default h1'
					),
					React.createElement(
						'h2',
						null,
						'Default h2'
					),
					React.createElement(
						'h3',
						null,
						'Default h3'
					),
					React.createElement(
						'h4',
						null,
						'Default h4'
					),
					React.createElement(
						'h5',
						null,
						'Default h5'
					),
					React.createElement(
						'p',
						null,
						'Paragraph'
					),
					React.createElement(
						'a',
						{ href: '#' },
						'Link'
					),
					React.createElement(
						'span',
						null,
						'Span'
					),
					React.createElement(
						'ul',
						null,
						React.createElement(
							'li',
							null,
							'List 1'
						),
						React.createElement(
							'li',
							null,
							'List 2'
						)
					),
					React.createElement(
						'button',
						null,
						'Default'
					),
					React.createElement(
						'button',
						{ className: 'primary' },
						'Primary'
					),
					React.createElement(
						'button',
						{ className: 'primary raised' },
						'Primary Raised'
					),
					React.createElement(
						'button',
						{ className: 'secondary' },
						'Secondary'
					),
					React.createElement(
						'button',
						{ className: 'secondary raised' },
						'Secondary Raised'
					),
					React.createElement(
						'button',
						{ className: 'secondary outline' },
						'Secondary Raised'
					),
					React.createElement('input', { type: 'text', placeholder: 'Input' }),
					React.createElement('textarea', { placeholder: 'Bigger input' })
				),
				React.createElement(Footer, null)
			);
		}
	}]);

	return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), appContainer);