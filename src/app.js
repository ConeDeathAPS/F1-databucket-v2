let appContainer = document.getElementById('appComponent');

const pages = ['Home', 'Seasons', 'Teams', 'Drivers', 'Tracks'];

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeComponent: pages[0],
		};
		this.setChosenPage = this.setChosenPage.bind(this);
		this.getChosenPage = this.getChosenPage.bind(this);
	}

	setChosenPage(targetPage) {
		this.setState({ activeComponent: targetPage });
	}

	getChosenPage() {
		if (this.state.activeComponent === 'Home') {
			return <Home />
		} else if (this.state.activeComponent === 'Seasons') {
			return <Seasons />
		} else if (this.state.activeComponent === 'Teams') {
			return <Teams />
		} else if (this.state.activeComponent === 'Drivers') {
			return <Drivers />
		} else if (this.state.activeComponent === 'Tracks') {
			return <Tracks />
		}		
	}

	render() {
		const activePage = this.getChosenPage();
		return (
			<div id="componentContainer">
				<Navbar activeComponent={this.state.activeComponent} onPageChange={this.setChosenPage} pages={pages}/>
					{activePage}
				<Footer />
			</div>
		);	
	}
}

ReactDOM.render(<App />, appContainer);