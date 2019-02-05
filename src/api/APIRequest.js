class ApiRequest {
	constructor(urlFragment, pageSize, pageOffset) {
		this.requestUrl = `http://ergast.com/api/f1/${urlFragment}.json?limit=${pageSize || 999}${typeof pageOffset !== 'undefined' ? `&offset=${pageOffset}` : ''}`;
	}

	send() {
		const req = new Request(this.requestUrl, { method: 'GET' });
		return fetch(req)
		.then((res) => {
			return res.json();
		})
		.catch((err) => {
			console.error(`An error occurred with the following request http://ergast.com/api/f1/${this.requestUrl}`, err);
			return Promise.reject(err);
		});
	}
}