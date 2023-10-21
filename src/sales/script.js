// #region GLOBAL VARIABLES
const imagePath = `../assets/img/catalog/`;
let catalogList = [];
let salesList = [];
// #endregion

// #region DATA MODELS

// Definir Sale class
class Sale {
	constructor(id, items, clientName, date, total) {
		this.id = id;
		this.items = items;
		this.clientName = clientName;
		this.date = date;
		this.total = total;
	}
}

function mapSalesData(data) {
	return data.map((item) => {
		return new Sale(
			item.id,
			item.items,
			item.clientName,
			new Date(item.date),
			item.total
		);
	});
}

// Definir la clase Videogame con los datos necesarios
class VideogameDescriptor {
	constructor(id, title, price) {
		this.id = id;
		this.title = title;
		this.price = price;
	}
}

function mapVideogameData(data) {
	return data.map((item) => {
		return new VideogameDescriptor(item.id, item.title, item.price);
	});
}

//#endregion

// #region SALES TABLE VIEW
function displaySalesView(sales) {
	clearTable();

	showLoadingMessage();

	if (sales.length === 0) {
		showNotFoundMessage();
	} else {
		hideMessage();
		displaySalesTable(sales);
	}
}

// Funcion que agrega los datos de los modelos de casas a la tabla.
function displaySalesTable(sales) {
	const tableBody = document.getElementById('sales-data-table-body');

	sales.forEach((sale) => {
		const row = document.createElement('tr');
		console.log(sale.date);

		row.innerHTML = `
		<td>${sale.id}</td>
		<td>${sale.items.join(', ')}</td>
		<td>${sale.clientName}</td>
		<td class="text-center">${sale.date.toLocaleDateString('en-MX')}</td>
		<td class="text-right">${formatCurrency(sale.total)}</td>
		<td class="text-center">
		  <button class="btn-delete" data-sale-id="${sale.id}">Eliminar</button>
		</td>
	  `;

		tableBody.appendChild(row);
	});

	initDeleteSaleButtonHandler();
}

// Funcion que limpia la tabla
function clearTable() {
	const tableBody = document.getElementById('sales-data-table-body');

	tableBody.innerHTML = '';
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

	message.innerHTML = 'No se encontraron ventas con los filtros seleccionados.';

	message.style.display = 'block';
}

// Funcion que oculta mensaje
function hideMessage() {
	const message = document.getElementById('message');

	message.style.display = 'none';
}
// #endregion

// #region FILTERS
function initFilterButtonsHandler() {
	document.getElementById('filter-form').addEventListener('submit', (event) => {
		event.preventDefault();
		filterSales();
	});

	document.getElementById('filter-form').addEventListener('reset', (event) => {
		event.preventDefault();
		resetSales();
	});
}

// Limpiar filtros y restablecer los datos de la tabla de ventas
function resetSales() {
	document.getElementById('title-filter').value = '';
	document.getElementById('client-filter').value = '';
	document.getElementById('date-filter').value = '';
	getSalesData();
}

// Filtrar ventas y actualizar datos de la tabla
function filterSales() {
	const title = document.getElementById('title-filter').value.toLowerCase();
	const clientName = document
		.getElementById('client-filter')
		.value.toLowerCase();
	const date = document.getElementById('date-filter').value;

	const filteredSales = salesList.filter(
		(sale) =>
			(!title ||
				sale.items.findIndex((item) => item.toLowerCase().includes(title)) >=
					0) &&
			(!clientName || sale.clientName.toLowerCase().includes(clientName)) &&
			(!date || sale.date === date)
	);

	displaySalesView(filteredSales);
}
// #endregion

//#region MODAL & DELETE SALE

// Event Handlers para abrir/cerrar el modal, agregar/eliminar item de la venta
// y confirmar ventar
function initAddSaleButtonsHandler() {
	document.getElementById('add-sale').addEventListener('click', () => {
		document.getElementById('modal-background').style.display = 'block';
		document.getElementById('modal').style.display = 'block';
	});

	document.getElementById('modal-background').addEventListener('click', () => {
		closeSaleModal();
	});

	document.getElementById('add-item').addEventListener('click', (event) => {
		event.preventDefault();
		const titleField = document.getElementById('title').value;
		catalogList.filter((videogame) => {
			if (videogame.title === titleField) {
				addItemToSale(videogame);
			}
		});
	});

	document.getElementById('reset-items').addEventListener('click', (event) => {
		event.preventDefault();
		clearSaleItems();
	});

	document.getElementById('sale-form').addEventListener('submit', (event) => {
		event.preventDefault();
		processNewSale();
	});
}

// Función para eliminar ventas del historial
function initDeleteSaleButtonHandler() {
	document.querySelectorAll('.btn-delete').forEach((button) => {
		button.addEventListener('click', () => {
			const saleId = button.getAttribute('data-sale-id');
			deleteSale(saleId);
		});
	});
}

// Cerrar modal y restablecer estado
function closeSaleModal() {
	clearSaleItems();
	document.getElementById('sale-form').reset();
	document.getElementById('modal-background').style.display = 'none';
	document.getElementById('modal').style.display = 'none';
}

// Función que agrega items a la vista de la tabla de una nueva venta
function addItemToSale(videogame) {
	const itemsTableBody = document.getElementById('sale-items-table-body');

	const row = document.createElement('tr');

	row.innerHTML = `
		<td>${videogame.title}</td>
		<td class="text-right">${formatCurrency(videogame.price)}</td>
	  `;

	itemsTableBody.appendChild(row);

	// Actualizar importe total de venta
	const importeTotal = document.getElementById('sale-total');
	const currentTotal = Number(importeTotal.innerHTML.replace(/[^0-9\.]+/g, ''));
	importeTotal.innerHTML = `${formatCurrency(currentTotal + videogame.price)}`;

	// Limpiar el campo del título del videojuego
	document.getElementById('title').value = '';
}

// Función que limpia el contenido de la tabla de items de la venta y el
// importe total
function clearSaleItems() {
	// Limpiar tabla
	const itemsTableBody = document.getElementById('sale-items-table-body');
	itemsTableBody.innerHTML = '';

	// Actualizar importe total
	const importeTotal = document.getElementById('sale-total');
	importeTotal.innerHTML = '$ 0.00';
}

// FUnción que procesa los datos de la nueva venta
function processNewSale() {
	// Obtener filas de la tabla de items
	const itemRows = Array.from(
		document.getElementById('sale-items-table-body').rows
	);

	// Mapear títulos de los videojuegos a un array
	let items = [];
	if (itemRows.length > 0) {
		itemRows.forEach((row) => {
			items.push(row.getElementsByTagName('td')[0].innerHTML);
		});
	} else {
		// Mostrar un mensaje cuanto no se he agregado ningún item a la venta
		window.alert(
			'No hay items registrados en la venta. Por favor, agregue por lo menos 1 producto.'
		);
		return;
	}

	const clientName = document.getElementById('client').value;
	const date = new Date(Date.now()).toLocaleString().split(',')[0];
	const total = Number(
		document.getElementById('sale-total').innerHTML.replace(/[^0-9\.]+/g, '')
	);

	// Crear objeto Sale
	const newSale = new Sale(null, items, clientName, date, total);

	// Registrar venta en la API
	submitSale(newSale);
}

//   #endregion

// #region POPULATE DATALIST
// Llenar el DataList con los títulos de los videojuegos
function populateDataList(catalogList) {
	const videogameDataList = document.getElementById('videogamesDataList');
	catalogList.forEach((videogame) => {
		const listOption = document.createElement('option');
		listOption.value = videogame.title;
		listOption.text = videogame.title;
		videogameDataList.appendChild(listOption);
	});
}
// #endregion

// #region API USAGE
// Cargar los datos necesarios del catálogo de videojuegos
function getVideogameData() {
	fetchAPI('catalog', 'GET').then((data) => {
		// Mapear datos a objetos Videogame
		catalogList = mapVideogameData(data);
		populateDataList(catalogList);
	});
}

// Cargar datos sobre ventas
function getSalesData() {
	fetchAPI('sales', 'GET').then((data) => {
		salesList = mapSalesData(data);
		displaySalesView(salesList);
	});
}

// Registrar nueva venta
function submitSale(newSale) {
	fetchAPI('sales', 'POST', newSale).then((newSale) => {
		closeSaleModal();
		//   Restablecer tabla de historial de ventas y filtros
		resetSales();
		// Mostrar mensaje de registro exitoso
		window.alert(`Venta ${newSale.id} realizada con éxito.`);
	});
}

// Eliminar venta
function deleteSale(saleId) {
	const confirmation = window.confirm(
		`¿Desea eliminar la venta ${saleId}? No podrá deshacer la operación.`
	);

	if (confirmation) {
		fetchAPI(`sales/${saleId}`, 'DELETE').then(() => {
			resetSales();
			window.alert(`La venta ${saleId} ha sido eliminada con éxito.`);
		});
	}
}
// #endregion

//#region INIT FUNCIONALIDAD

initAddSaleButtonsHandler();
initFilterButtonsHandler();
getVideogameData();
getSalesData();
//#endregion
