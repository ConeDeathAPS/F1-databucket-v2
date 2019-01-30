class SeasonDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeSeason: this.props.activeSeason,
		};
	}

	render() {
		return (
			<div id="seasonDetail">
				{this.state.activeSeason ? (
					<p>Have season!</p>
				) : (
					<p>Dont have season!</p>
				)}
			</div>
		);
	}
}