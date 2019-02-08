class RaceResults extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			results: undefined,
			race: {
				year: this.props.race.season,
				round: this.props.race.round,
			},
		};
	}

	componentDidMount() {
		if (!this.state.race || !this.state.race.year || !this.state.race.round) {
			console.error('Invalid race properties provided:', this.state.race);
			return;
		}
		const urlFragment = `${this.state.race.year}/${this.state.race.round}/results`;
		const apiReq = new ApiRequest(urlFragment, 30, 0);
		apiReq.send()
		.then((results) => {
			this.setState({
				results: results.MRData.RaceTable.Races[0],
			});
		})
		.catch((err) => {
			console.error('Error while fetching race results:', err);
		});
	}

	componentWillUnmount() {

	}

	render() {
		console.log('Results:', this.state.results);
		let races;
		if (this.state.results) {
			races = this.state.results.Results.map(pos => (
				<RacePosition position={pos} key={pos.position} />
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