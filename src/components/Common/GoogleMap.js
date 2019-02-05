class GoogleMap extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			location: this.props.location,
		};
	}

	componentDidMount() {
		if (!this.state.location) {
			console.error('Invalid map properties found:', this.state.location);
			return false;
		}
		const map = new google.maps.Map(document.getElementById('gMap'), this.state.location);		
		const marker = new google.maps.Marker({ position: this.state.location.center, map, });
	}

	componentWillUnmount() {

	}

	render() {
		return (
			<div id="gMap"></div>
		)
	}
}