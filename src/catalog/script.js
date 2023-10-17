// #region DATA MODELS

// Definir clase Videogame
class Videogame {
	constructor(id, title, price, platform, rating, cover) {
		this.id = id;
		this.title = title;
		this.price = price;
		this.platform = platform;
		this.rating = rating;
		this.cover = cover;
	}
}

// Crear objetos de la clase Videogame
const videogame_1 = new Videogame(
	1,
	'The Elder Scrolls V: Skyrim Special Edition',
	600,
	'PC, Xbox One, PlayStation 4',
	9.1,
	'skyrim_se.png'
);

const videogame_2 = new Videogame(
	2,
	"Baldur's Gate 3",
	1299,
	'PC',
	9.7,
	'baldurs_gate_3.png'
);

const videogame_3 = new Videogame(
	3,
	'Dragon Age: Origins - Ultimate Edition',
	449,
	'PC',
	9,
	'dragon_age_origins_ue.png'
);

// Guardar objetos en un array
const catalogList = [videogame_1, videogame_2, videogame_3];

// #endregion

// #region VIEW MODEL

// Función para el despliegue del array de videogames en un Card Grid Layout
function displayCatalog(videogames) {
	clearGrid();

	showLoadingMessage();

	setTimeout(() => {
		if (videogames.length === 0) {
			showNotFoundMessage();
		} else {
			hideMessage();

			const videogameList = document.getElementById('catalog');

			const imagePath = `../assets/img/catalog/`;

			videogames.forEach((videogame) => {
				const listItem = document.createElement('li');
				listItem.setAttribute('class', 'cards-item');

				listItem.innerHTML = `
					<div class="card">
						<div class="card-image"><img src="${imagePath + videogame.cover}"></div>
						<div class="card-content">
							<p class="card-title">${videogame.title}</p>
							<p class="card-platform">${videogame.platform}</p>
							<p class="card-rating">${videogame.rating}<span class="star">&#9733;</span></p>
							<p class="card-price">${formatCurrency(videogame.price)}</p>
							<button class="card-btn">COMPRAR</button>
						</div>
					</div>
				`;

				videogameList.appendChild(listItem);
			});
		}
	}, 2000);
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

	displayCatalog(filteredVideogames);
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
			(!platform || videogame.platform.toLowerCase().includes(platform)) &&
			(!rating || videogame.rating >= rating) &&
			(!minPrice || videogame.price >= minPrice) &&
			(!maxPrice || videogame.price <= maxPrice)
	);
}

//#endregion

//#region INIT FUNCIONALIDAD

displayCatalog(catalogList);
initButtonsHandler();

//#endregion
