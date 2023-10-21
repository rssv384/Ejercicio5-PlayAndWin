// #region GLOBAL VARIABLES
const imagePath = `../assets/img/catalog/`;
let catalogList = [];
// #endregion

// #region DATA MODELS

// Definir Sale class
class Sale {
	constructor(id, items, clientName, date, total) {
		this.id = id; // ID Venta
		this.items = items; // Lista de videojuegos de la venta
		this.clientName = clientName; // Nombre del cliente
		this.date = date; // Fecha de la venta
		this.total = total; // Importe total de la venta
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

//#region MODAL

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
function loadVideogameData() {
	fetchAPI('catalog', 'GET').then((data) => {
		// Mapear datos a objetos Videogame
		catalogList = mapVideogameData(data);
		populateDataList(catalogList);
	});
}

// Registrar nueva venta
function submitSale(newSale) {
	fetchAPI('sales', 'POST', newSale).then((newSale) => {
		closeSaleModal();
		//   Restablecer tabla de historial de ventas y filtros

		// Mostrar mensaje de registro exitoso
		window.alert(`Venta ${newSale.id} realizada con éxito.`);
	});
}
// Agrega funcionalidad para mostrar detalles de la venta en una tabla
function addItemToSale(videogame) {
	const itemsTableBody = document.getElementById('sale-items-table-body');
	const saleDetailsTableBody = document.getElementById('sale-details-table-body');
  
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
  
	// Agregar detalles de venta
	const saleDetailsRow = document.createElement('tr');
	saleDetailsRow.innerHTML = `
	  <td>${videogame.title}</td>
	  <td class="text-right">${formatCurrency(videogame.price)}</td>
	`;
	saleDetailsTableBody.appendChild(saleDetailsRow);
  
	// Limpiar el campo del título del videojuego
	document.getElementById('title').value = '';
  }
  
  // Función que limpia el contenido de la tabla de items de la venta y el importe total
  function clearSaleItems() {
	// Limpiar tabla de items
	const itemsTableBody = document.getElementById('sale-items-table-body');
	itemsTableBody.innerHTML = '';
  
	// Limpiar tabla de detalles de venta
	const saleDetailsTableBody = document.getElementById('sale-details-table-body');
	saleDetailsTableBody.innerHTML = '';
  
	// Actualizar importe total
	const importeTotal = document.getElementById('sale-total');
	importeTotal.innerHTML = '$ 0.00';
  }
  
// #endregion

//#region INIT FUNCIONALIDAD

initAddSaleButtonsHandler();
loadVideogameData();
//#endregion

