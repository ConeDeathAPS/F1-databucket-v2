class RacePosition extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			position: this.props.position,
		};
	}

	determinePlacesChanged(position) {
		return parseInt(position.grid, 10) - parseInt(position.position, 10);
	}

	render() {
		return (
			<article className="racePosition">
				<h1>{this.state.position.position}</h1>
				<div>
					<h4>#{this.state.position.number} - <b>{this.state.position.Driver.givenName} {this.state.position.Driver.familyName}</b></h4>
					<p>{this.state.position.Constructor.name}</p>
					<p>{this.state.position.laps} laps{this.state.position.position === '1' ? ` - ${this.state.position.Time.time}` : ''}</p>
					<p>Starting position: {this.state.position.grid}</p>
				</div>
				<p className="positionFooter">{this.state.position.status}</p>
			</article>
		);
	}
}