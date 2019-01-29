class Seasons extends React.Component {
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
	}

	render() {
		return (
			<main>
				<SeasonList />
			</main>
		)
	}
}