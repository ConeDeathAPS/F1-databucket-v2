class SeasonList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			seasons: [],
			loading: true,
			totalSeasons: 0,
			yearFilter: undefined,
		};
		this.fetchSeasons = this.fetchSeasons.bind(this);
	}

	componentDidMount() {
		this.fetchSeasons(1, 25);
	}

	componentWillUnmount() {
		this.setState({
			seasons: [],
		});
	}

	fetchSeasons(targetPage, targetPageSize) {
		this.setState({
			loading: true,
		});
		const safePageSize = targetPageSize;
		const safePage = (targetPage - 1) * safePageSize;
		const apiReq = new ApiRequest('seasons', safePageSize, safePage);
		apiReq.send()
		.then((seasonsResponse) => {
			console.log('Seasons response:', seasonsResponse);
			this.setState({
				seasons: seasonsResponse.MRData.SeasonTable.Seasons,
				totalSeasons: parseInt(seasonsResponse.MRData.total, 10),
				loading: false,
			});
		})
		.catch((err) => {
			console.error('Error while getting all seasons:', err);
		});
	}

	render() {
		const years = this.state.seasons.map(s => (
			<button className="primary" href={s.url} key={s.season} onClick={() => { this.props.onSeasonSelect(s.season) }}>{s.season}</button>
		));
		return (
			<div id="seasonsList">
				<section id="headerRow">
					<input type="text" value={this.state.yearFilter} placeholder="Search for a year" disabled={this.state.loading} />
					{ this.state.totalSeasons > 0 &&
						<Paginator totalItems={this.state.totalSeasons} fetchSeasons={this.fetchSeasons} isDisabled={this.state.loading} />
					}				
				</section>
				<section id="seasonsPage">
					{years}
				</section>
			</div>
		);
	}
}