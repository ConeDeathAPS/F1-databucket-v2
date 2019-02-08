class SeasonDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			race: undefined,
		};
	}

	onRaceSelected(e, r) {
		if (this.state.race && this.state.race.round === r.round) e.preventDefault();
		this.setState({
			race: r,
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
					<>
						<h1>{this.props.activeSeason.season}</h1>
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
						{this.state.race && selectedRaceLocation &&
							<RaceResults race={this.state.race} />
						}
					</>
				) : (
					<h2>Pick a season!</h2>
				)}
			</div>
		);
	}
}