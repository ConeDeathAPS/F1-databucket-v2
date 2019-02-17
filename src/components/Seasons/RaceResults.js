class RaceResults extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			results: this.props.results,
		};
	}

	render() {
		console.log('Rendering with round:', this.state.results.round);
		let races;
		if (this.state.results) {
			races = this.state.results.Results.map(pos => (
				<RacePosition position={pos} key={pos.Driver.driverId} />
			));			
		}
		return (
			<div id="raceDetail">
				{this.state.results ? (
					<>
						<header>
							<h2>{this.state.results.raceName}</h2>
							<p>Round {this.state.results.round} - {new Date(this.state.results.date).toLocaleDateString()}</p>
						</header>
						<div id="positionRow">
							{races}
						</div>
					</>
				) : (
					<h3>Race Results</h3>
				)}
			</div>
		);
	}
}