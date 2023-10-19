//#region MODAL

function initAddSaleButtonsHandler() {
	document.getElementById('addSale').addEventListener('click', () => {
		document.getElementById('modal-background').style.display = 'block';
		document.getElementById('modal').style.display = 'block';
	});

	document.getElementById('modal-background').addEventListener('click', () => {
		document.getElementById('modal-background').style.display = 'none';
		document.getElementById('modal').style.display = 'none';
	});
}
//   #endregion

//#region INIT FUNCIONALIDAD

initAddSaleButtonsHandler();

//#endregion
