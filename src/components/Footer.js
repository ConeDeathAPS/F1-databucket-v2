module.exports = class Footer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<footer>
				<p>
					Version 0.1 - Check out the source on&nbsp;
					<a href="https://github.com/conedeathaps/F1-databucket-v2"> 
						github!
					</a>
				</p>
			</footer>
		)
	}
}