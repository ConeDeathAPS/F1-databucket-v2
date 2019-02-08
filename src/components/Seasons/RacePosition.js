class RacePosition extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			position: this.props.position,
		};
	}

	render() {
		return (
			<article className="racePosition">
				<h1>{this.state.position.position}</h1>
				<div>
					<p>#{this.state.position.number} - <b>{this.state.position.Driver.givenName} {this.state.position.Driver.familyName}</b></p>
				</div>
			</article>
		);
	}
}