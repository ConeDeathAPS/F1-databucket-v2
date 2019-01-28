module.exports = class NavbarLink extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const page = this.props.page;
		const className = this.props.isActive ? 'active' : '';
		return (
			<a 
				href="#"
				className={className}
				onClick={() => this.props.click(page)}>
				{page}
			</a>
		);
	}
}