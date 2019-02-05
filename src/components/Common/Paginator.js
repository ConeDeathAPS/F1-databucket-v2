class Paginator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pageNumber: 1,
			pageSize: 25,
			pageSizes: [10, 25, 50],
			totalItems: this.props.totalItems,
			allPages: [],
		};
		this.getAllPages = this.getAllPages.bind(this);
		this.onNextPage = this.onNextPage.bind(this);
		this.onPreviousPage = this.onPreviousPage.bind(this);
		this.onPageSizeChanged = this.onPageSizeChanged.bind(this);
		this.goToPage = this.goToPage.bind(this);
	}

	componentDidMount() {
		this.getAllPages();
	}

	componentWillUnmount() {

	}

	getAllPages() {
		let pageCount = 1;
		let totalItems = this.state.totalItems;
		const pagesArray = [];
		while (totalItems > 0) {
			pagesArray.push(pageCount);
			totalItems -= this.state.pageSize;
			pageCount += 1;
		}
		this.setState({
			allPages: pagesArray,
		});
	}

	goToPage(page) {
		this.props.fetchSeasons(page, this.state.pageSize);
		this.setState({
			pageNumber: page,
		});
	}

	onPageSizeChanged(e) {
		this.setState({
			pageSize: parseInt(e.target.value, 10),
		}, () => {
			this.props.fetchSeasons(this.state.pageNumber, this.state.pageSize)
			this.getAllPages();	
		});
	}

	onNextPage(e) {
		if (!this.state.allPages[this.state.pageNumber]) e.preventDefault();
		this.props.fetchSeasons(this.state.pageNumber + 1, this.state.pageSize);
		const currentPage = this.state.pageNumber;
		this.setState({
			pageNumber: currentPage + 1,
		});
	}

	onPreviousPage(e) {
		if (this.state.pageNumber === 1) e.preventDefault();
		this.props.fetchSeasons(this.state.pageNumber - 1, this.state.pageSize);
		const currentPage = this.state.pageNumber;
		this.setState({
			pageNumber: currentPage - 1,
		});
	}

	render() {
		const allPages = this.state.allPages.map(page => (
			<button className="secondary" onClick={() => {this.goToPage(page)}} disabled={this.state.pageNumber === page} key={page}>
				{page}
			</button>
		));
		const pageSizeOptions = this.state.pageSizes.map(size =>(
			<option value={size} key={size}>{size}</option>
		));
		return (
			<section id="pagination">
				<select value={this.state.pageSize} onChange={this.onPageSizeChanged} disabled={this.props.isDisabled}>
					{pageSizeOptions}
				</select>
				<button className="primary icon-button" onClick={this.onPreviousPage} disabled={this.state.pageNumber === 1 || this.props.isDisabled}>
					<i className="material-icons">chevron_left</i>
				</button>
				{allPages}
				<button className="primary icon-button" onClick={this.onNextPage} disabled={!this.state.allPages[this.state.pageNumber] || this.props.isDisabled}>
					<i className="material-icons">chevron_right</i>
				</button>
				<p>{this.state.totalItems} total</p>
			</section>
		);
	}
}