// #region GLOBAL VARIABLES
const imagePath = `../assets/img/catalog/`;
let catalogList = [];

// #endregion

// #region DATA MODELS

// Definir clase Videogame
class Videogame {
	constructor(id, title, price, platform, rating, cover_img) {
		this.id = id;
		this.title = title;
		this.price = price;
		this.platform = platform;
		this.rating = rating;
		this.cover_img = cover_img;
	}
}

// #endregion

// #region VIEW MODEL

// Función que controla el despliegue de datos o mensajes en la vista del
// catálogo
function displayContent(videogames) {
	clearGrid();

	showLoadingMessage();

	if (videogames.length === 0) {
		showNotFoundMessage();
	} else {
		hideMessage();
		displayCatalog(videogames);
	}
}

// Función para el despliegue del array de videojuegos en un Card Grid Layout
function displayCatalog(videogames) {
	const videogameList = document.getElementById('catalog');

	videogames.forEach((videogame) => {
		const listItem = document.createElement('li');
		listItem.setAttribute('class', 'cards-item');

		listItem.innerHTML = `
					<div class="card">
						<div class="card-image"><img src="${imagePath + videogame.cover_img}"></div>
						<div class="card-content">
							<p class="card-title">${videogame.title}</p>
							<p class="card-platform">${videogame.platform.join(' | ')}</p>
							<p class="card-rating">${videogame.rating}<span class="star">&#9733;</span></p>
							<p class="card-price">${formatCurrency(videogame.price)}</p>
							<button class="btn-transparent card-btn">VER MÁS</button>
						</div>
					</div>
				`;

		videogameList.appendChild(listItem);
	});
}

// Funcion que limpia el grid del catálogo
function clearGrid() {
	const videogameList = document.getElementById('catalog');
	videogameList.innerHTML = '';
}

// Funcion que muestra mensaje de carga
function showLoadingMessage() {
	const message = document.getElementById('message');

	message.innerHTML = 'Cargando...';

	message.style.display = 'block';
}

// Funcion que muestra mensaje de que no se encuentraron datos
function showNotFoundMessage() {
	const message = document.getElementById('message');

	message.innerHTML = 'Ningún videojuego cumple con el filtro seleccionado.';

	message.style.display = 'block';
}

// Funcion que oculta mensaje
function hideMessage() {
	const message = document.getElementById('message');

	message.style.display = 'none';
}

// #endregion

//#region FILTROS

// Función para inicializar los EventListener de los botones de los filtros
function initButtonsHandler() {
	document.getElementById('filter-form').addEventListener('submit', (event) => {
		event.preventDefault();
		applyFilters();
	});

	document.getElementById('reset-filters').addEventListener('click', () => {
		document
			.querySelectorAll('input.filter-field')
			.forEach((input) => (input.value = ''));
		applyFilters();
	});
}

// Funcion que controla la aplicación de los filtros al catálogo y su posterior
// despliegue.
function applyFilters() {
	const filterTitle = document.getElementById('title').value.toLowerCase();
	const filterPlatform = document
		.getElementById('platform')
		.value.toLowerCase();
	const filterRating = parseFloat(document.getElementById('rating').value);
	const filterMinPrice = parseFloat(document.getElementById('min-price').value);
	const filterMaxPrice = parseFloat(document.getElementById('max-price').value);

	const filteredVideogames = filterVideogames(
		catalogList,
		filterTitle,
		filterPlatform,
		filterRating,
		filterMinPrice,
		filterMaxPrice
	);

	displayContent(filteredVideogames);
}

// Funcion para el filtrado de videojuegos.
function filterVideogames(
	videogames,
	title,
	platform,
	rating,
	minPrice,
	maxPrice
) {
	return videogames.filter(
		(videogame) =>
			(!title || videogame.title.toLowerCase().includes(title)) &&
			(!platform ||
				videogame.platform.findIndex((item) =>
					item.toLowerCase().includes(platform)
				) >= 0) &&
			(!rating || videogame.rating >= rating) &&
			(!minPrice || videogame.price >= minPrice) &&
			(!maxPrice || videogame.price <= maxPrice)
	);
}

//#endregion

// #region API USAGE
// Función que realiza la petición GET a la API para obtener los datos sobre
// los videojuegos del catálogo
function loadData() {
	fetchAPI('catalog', 'GET').then((data) => {
		// Mapear datos a objetos Videogame
		catalogList = data.map((item) => {
			return new Videogame(
				item.id,
				item.title,
				item.price,
				item.platform,
				item.rating,
				item.cover_img
			);
		});

		// Mostrar datos en la vista del catálogo
		displayContent(catalogList);
	});
}
// #endregion

//#region INIT FUNCIONALIDAD

initButtonsHandler();
showLoadingMessage();
loadData();

//#endregion
