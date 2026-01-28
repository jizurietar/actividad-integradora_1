// Variables globales
let products = [];
let productIdCounter = 1;

const productNameInput = document.getElementById('product-name');
const productQuantityInput = document.getElementById('product-quantity');
const productList = document.getElementById('product-list');
const emptyMessage = document.getElementById('empty-message');
const totalProductsElement = document.getElementById('total-products');

// Mensajes de error
const nameError = document.getElementById('name-error');
const quantityError = document.getElementById('quantity-error');


// Inicializar la aplicación
function initApp() {
    alert('hola')
}

// Inicializar la aplicación cuando se carga la página
document.addEventListener('DOMContentLoaded', initApp);