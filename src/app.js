let appContainer = document.getElementById('appComponent');

const pages = ['Home', 'Teams', 'Drivers', 'Tracks'];

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
			return <HomePage />
		} else if (this.state.activeComponent === 'Teams') {
			return <TeamsPage />
		} else if (this.state.activeComponent === 'Drivers') {
			return <DriversPage />
		} else if (this.state.activeComponent === 'Tracks') {
			return <TracksPage />
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