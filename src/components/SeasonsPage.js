class SeasonsPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loadingState: false, // If true, we are loading data from the API
			currentPage: 1, // The current page of seasons
			pageSize: 25, // The size of the page
			totalSeasons: 0, // The total number of seasons available
			seasons: [], // The currently viewed array of seasons
			disallowNextPage: true,
			disallowPreviousPage: false,
		};
		this.onNextPage = this.onNextPage.bind(this);
		this.onPreviousPage = this.onPreviousPage.bind(this);
	}

	componentDidMount() {
		this.fetchSeasons();
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
		const safePageSize = targetPageSize || this.state.pageSize;
		const safePage = targetPage || this.state.currentPage;
		const apiReq = new ApiRequest('seasons', safePageSize, safePage);
		apiReq.send()
		.then((seasonsResponse) => {
			console.log('Seasons response:', seasonsResponse);
			this.setState({
				seasons: seasonsResponse.MRData.SeasonTable.Seasons,
				totalSeasons: seasonsResponse.MRData.SeasonTable.total,
				loading: false,
				disallowNextPage: ((this.state.currentPage + 1 * this.state.pageSize) - this.state.pageSize > seasonsResponse.MRData.SeasonTable.total),
				disallowPreviousPage: (this.state.currentPage >= 1),
				currentPage: safePage,
				pageSize: safePageSize,
			});
		})
		.catch((err) => {
			console.error('Error while getting all seasons:', err);
		});
	}

	onNextPage() {
		if (this.state.disallowNextPage) return false;
		this.fetchSeasons(this.state.currentPage + 1);
	}

	onPreviousPage() {
		if (this.state.disallowPreviousPage) return false;
		this.fetchSeasons(this.state.currentPage - 1);
	}

	render() {
		return (
			<main>
				<h2>Seasons</h2>
				<p>Viewing page {this.state.currentPage}</p>
				<button
					className="primary raised"
					onClick={this.onPreviousPage}
					disabled={this.state.disallowPreviousPage}>
					Previous Page
				</button>
				<button
					className="primary raised"
					onClick={this.onNextPage}
					disabled={this.state.disallowNextPage}>
					Next Page
				</button>
			</main>
		)
	}
}