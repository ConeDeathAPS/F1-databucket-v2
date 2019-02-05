class Seasons extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			season: undefined,
			activeSeason: undefined,
		};
		this.onSeasonSelect = this.onSeasonSelect.bind(this);
		this.fetchSeasonData = this.fetchSeasonData.bind(this);
	}

	onSeasonSelect(season) {
		this.setState({
			season: season
		}, () => {
			this.fetchSeasonData();
		});
	}

	fetchSeasonData() {
		this.setState({
			loading: true,
		});
		if (isNaN(this.state.season) || this.state.season.length !== 4) {
			console.error(`Invalid season "${this.state.season}". Must be a 4 digit year.`);
			return Promise.reject(`Invalid season "${this.state.season}". Must be a 4 digit year.`);
		}
		const apiReq = new ApiRequest(this.state.season);
		apiReq.send()
		.then((seasonResponse) => {
			console.log('Season response:', seasonResponse);
			this.setState({
				activeSeason: seasonResponse.MRData.RaceTable,
				loading: false,
			});
		})
		.catch((err) => {
			console.error('Error while getting all seasons:', err);
		});
	}

	render() {
		return (
			<main id="seasons">
				<SeasonList onSeasonSelect={this.onSeasonSelect} />
				<SeasonDetail activeSeason={this.state.activeSeason} />
			</main>
		)
	}
}