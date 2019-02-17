class Teams extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTeam: undefined,
		};
	}

	render() {
		return (
			<main id="teams">
				<TeamList />
			</main>
		);
	}
}