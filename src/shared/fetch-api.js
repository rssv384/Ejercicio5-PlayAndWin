const apiURL = 'https://652febab6c756603295deff5.mockapi.io';

function fetchAPI(endpoint, method = 'GET', data = null) {
	const url = `${apiURL}/${endpoint}`;

	const headers = {
		'Content-Type': 'application/json',
	};

	const options = {
		method,
		headers,
	};

	if (
		data !== null &&
		(method === 'POST' || method === 'PUT' || method === 'DELETE')
	) {
		options.body = JSON.stringify(data);
	}

	return fetch(url, options)
		.then((response) => {
			if (!response.ok) {
				throw new Error('Error al obtener los datos:' + response.status);
			}
			return response.json();
		})
		.catch((error) => {
			if (error instanceof TypeError) {
				console.error('Error de Red:', error.message);
			} else {
				console.error('Error General:', error.message);
			}
		});
}
