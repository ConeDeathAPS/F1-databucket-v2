class SeasonDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			race: undefined,
		};
	}

	onRaceSelected(e, r) {
		if (this.state.race && this.state.race.round === r.round) e.preventDefault();
		console.log('Selecting race:', r);
		this.setState({
			race: r,
		});
	}

	render() {
		console.log('this.props.season:', this.props.activeSeason);
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
				lat: parseInt(this.state.race.Circuit.Location.lat, 10),
				lng: parseInt(this.state.race.Circuit.Location.long, 10),
			};
		}
		return (
			<div id="seasonDetail">
				{this.props.activeSeason ? (
					<>
						<h2>{this.props.activeSeason.season}</h2>
						<div id="seasonDetailMainRow">
							<section id="seasonRoundsList">
								{races}
							</section>
							{this.state.race ? (
								<GoogleMap location={ { center: selectedRaceLocation, zoom: 13 } } />
							) : (
								<h3>Select a race!</h3>
							)}
						</div>
					</>
				) : (
					<h2>Pick a season!</h2>
				)}
			</div>
		);
	}
}