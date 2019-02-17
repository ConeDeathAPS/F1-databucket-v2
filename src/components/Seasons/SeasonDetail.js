class SeasonDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			race: undefined,
			raceResults: undefined,
			loadingResults: false,
		};
	}

	onRaceSelected(e, r) {
		if (this.state.race && this.state.race.round === r.round) e.preventDefault();
		this.setState({
			race: r,
		}, () => {
			this.fetchRaceResults();
		});
	}

	fetchRaceResults() {
		if (!this.state.race || !this.state.race.season || !this.state.race.round) {
			console.error('Invalid race properties provided:', this.state.race);
			return;
		}
		this.setState({
			loadingResults: true,
		});
		const urlFragment = `${this.state.race.season}/${this.state.race.round}/results`;
		const apiReq = new ApiRequest(urlFragment, 30, 0);
		apiReq.send()
		.then((results) => {
			this.setState({
				raceResults: results.MRData.RaceTable.Races[0],
				loadingResults: false,
			});
		})
		.catch((err) => {
			console.error('Error while fetching race results:', err);
		});
	}

	render() {
		let races;
		let selectedRaceLocation;
		if (this.props.activeSeason) {
			races = this.props.activeSeason.Races.map(race => (
				<button 
					className={`secondary ${this.state.race && this.state.race.round === race.round ? 'raised' : ''}`}
					id={`${race.season}-${race.round}`} 
					key={race.round}
					onClick={(e) => { this.onRaceSelected(e, race) }}>
					{race.raceName}
				</button>
			));
		}
		if (this.state.race) {
			selectedRaceLocation = {
				center: {
					lat: parseFloat(this.state.race.Circuit.Location.lat),
					lng: parseFloat(this.state.race.Circuit.Location.long),					
				},
				zoom: 13,
			};
		}
		return (
			<div id="seasonDetail">
				{this.props.activeSeason ? (
					<div id="seasonDetailMainRow">
						<section id="seasonRoundsList">
							{races}
						</section>
						<section id="raceMapContainer">
							{this.state.race && selectedRaceLocation ? (
								<GoogleMap location={selectedRaceLocation} />
							) : (
								<h3>Select a race!</h3>
							)}
						</section>
					</div>
				) : (
					<h2>Pick a season!</h2>
				)}
				{this.state.raceResults && !this.state.loadingResults &&
					<RaceResults results={this.state.raceResults} />
				}
				{this.state.loadingResults &&
					<p>Loading...</p>
				}
			</div>
		);
	}
}