module.exports = class Navbar extends React.Component {
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