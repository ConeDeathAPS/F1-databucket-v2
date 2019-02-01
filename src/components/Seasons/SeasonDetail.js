class SeasonDetail extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log('this.props.season:', this.props.activeSeason);
		let races;
		if (this.props.activeSeason) {
			races = this.props.activeSeason.Races.map(race => (
				<article className="raceRow" id={`${race.season}-${race.round}`} key={race.round}>
					<p><b>Round {race.round}</b>&nbsp;-&nbsp;</p>
					<a href={race.url} target="_blank">
						{race.raceName}
					</a>
				</article>
			));
		}
		return (
			<div id="seasonDetail">
				{this.props.activeSeason ? (
					<>
						<h2>{this.props.activeSeason.season}</h2>
						<section id="seasonRoundsList">
							{races}
						</section>
					</>
				) : (
					<h2>Dont have season!</h2>
				)}
			</div>
		);
	}
}