class GoogleMap extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			location: {
				center: {lat: undefined, lng: undefined},
				zoom: 13,			
			},
		};
	}

	onMapInit() {
		if (!this.props.mapProps) {
			console.error('Invalid map properties found:', this.props.mapProps);
			return false;
		}
		const map = new google.maps.Map(document.getElementById('map'), {
			center: { lat: this.state.race.Circuit.Location.lat, lng: this.state.race.Circuit.Location.long },
			zoom: 12,
		});
	}

	onMapLocationChange(locObj) {
		if (!locObj.center || !locObj.center.lat || !locObj.center.lng || !locObj.zoom) {
			console.error('Invalid locationObject provided');
			return false;
		}
		this.setState({
			location: locObj,
		});
	}

	render() {
		return (
			<div id="gMap"></div>
		)
	}
}