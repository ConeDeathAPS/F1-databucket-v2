class TeamList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			teams: [],
			loading: true,
			totalTeams: 0,
			activeTeam: undefined,
			showingAllTeams: true,
			showingCurrentTeams: false,
			teamsFilter: undefined,
		};
	}

	componentDidMount() {
		this.fetchTeams(1, 50);
	}

	componentWillUnmount() {
		this.setState({
			teams: [],
		});
	}

	showAllTeams() {
		if (this.state.showingAllTeams) return false;
		this.setState({
			showingAllTeams: true,
			showingCurrentTeams: false,
		}, () => {
			this.fetchTeams(1, 50);
		});
	}

	showCurrentTeams() {
		if (this.state.showingCurrentTeams) return false;
		this.setState({
			showingAllTeams: false,
			showingCurrentTeams: true,
		}, () => {
			this.fetchTeams(1, 25)
		});
	}

	setSelectedTeam(team) {
		if (this.state.activeTeam && this.state.activeTeam.constructorId === team.constructorId) return false;
		this.setState({
			activeTeam: team,
		}, () => {
			console.log('Selected team:', this.state.activeTeam);
		});
	}

	fetchTeams(targetPage, targetPageSize) {
		this.setState({
			loading: true,
		});
		const safePageSize = targetPageSize;
		const safePage = (targetPage - 1) * safePageSize;
		const seasonPrefix = this.state.showingCurrentTeams ? '2018' : '';
		const apiReq = new ApiRequest(`${seasonPrefix.length ? `${seasonPrefix}/` : ''}constructors`,
			this.state.showingAllTeams ? safePageSize : 999,
			this.state.showingAllTeams ? safePage : 0);
		apiReq.send()
		.then((constructorsResponse) => {
			console.log('Teams response:', constructorsResponse.MRData);
			this.setState({
				teams: constructorsResponse.MRData.ConstructorTable.Constructors,
				totalTeams: parseInt(constructorsResponse.MRData.total, 10),
				loading: false,
			});
		})
		.catch((err) => {
			console.error('Error while getting teams:', err);
		});
	}

	render() {
		const teams = this.state.teams.map(team => (
			<button className={this.state.activeTeam && this.state.activeTeam.constructorId === team.constructorId ? 'primary raised' : 'primary'}
				onClick={() => this.setSelectedTeam(team)}
				key={team.constructorId}>
				{team.name}
			</button>
		));
		return (
			<div id="teamsList">
				<section id="headerRow">
					<button className={this.state.showingAllTeams ? 'secondary raised' : 'secondary'}
						onClick={() => this.showAllTeams()}>
						All Constructors
					</button>
					<button className={this.state.showingCurrentTeams ? 'secondary raised' : 'secondary'}
						onClick={() => this.showCurrentTeams()}>
						Current Constructors
					</button>
					{this.state.showingAllTeams && 
						<Paginator totalItems={this.state.totalTeams} fetchItems={this.fetchTeams} isDisabled={this.state.loading} />
					}
				</section>
				<section id="teamsPage">
					{!this.state.loading && teams.length > 1 ? (
						teams
					) : (
						<p>Loading...</p>
					)}
				</section>
			</div>
		)
	}
}