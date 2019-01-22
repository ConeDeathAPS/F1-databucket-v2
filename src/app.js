'use strict';

let appContainer = document.getElementById('appComponent');

class Footer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<footer>
				<p>
					Version 0.1 - Check out the source on&nbsp;
					<a href="https://github.com/conedeathaps/F1-databucket-v2"> 
						github!
					</a>
				</p>
			</footer>
		)
	}
}

class NavbarLink extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const page = this.props.page;
		const className = this.props.isActive ? 'active' : '';
		return (
			<a 
				href="#"
				className={className}
				onClick={() => this.props.click(page)}>
				{page}
			</a>
		);
	}
}

class Navbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeComponent: this.props.activeComponent,
		};
		this.onPageClick = this.onPageClick.bind(this);
	}

	onPageClick(clickedPage) {
		this.setState({
			activeComponent: clickedPage,
		});
	}

	render() {
		const navButtons = this.props.pages.map(page => (
			<NavbarLink 
				page={page} 
				isActive={this.state.activeComponent === page} 
				key={page} 
				click={this.onPageClick}/>
		));
		return (
			<nav>
				<h2>Formula 1 Databucket</h2>
				<section>
					{navButtons}
				</section>
			</nav>
		);		
	}
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeComponent: 'Home',
		};
	}
	render() {
		const pages = ['Home', 'Teams', 'Drivers', 'Tracks'];
		return (
			<div id="componentContainer">
				<Navbar activeComponent={this.state.activeComponent} pages={pages}/>
				<main>
					<h1>Default h1</h1>
					<h2>Default h2</h2>
					<h3>Default h3</h3>
					<h4>Default h4</h4>
					<h5>Default h5</h5>
					<p>Paragraph</p>
					<a href="#">Link</a>
					<span>Span</span>
					<ul>
						<li>List 1</li>
						<li>List 2</li>
					</ul>
					<button>Default</button>
					<button className="primary">Primary</button>
					<button className="primary raised">Primary Raised</button>
					<button className="secondary">Secondary</button>
					<button className="secondary raised">Secondary Raised</button>
					<button className="secondary outline">Secondary Raised</button>
					<input type="text" placeholder="Input" />
					<textarea placeholder="Bigger input"></textarea>				
				</main>
				<Footer />
			</div>
		);	
	}

}

ReactDOM.render(<App />, appContainer);