// Variables globales
let products = [];
let productIdCounter = 1;

const productForm = document.getElementById('product-form');
const productNameInput = document.getElementById('product-name');
const productQuantityInput = document.getElementById('product-quantity');
const productList = document.getElementById('product-list');
const emptyMessage= document.getElementById('empty-message');
const totalProductsElement = document.getElementById('total-products');

// Mensajes de error
const nameError = document.getElementById('name-error');
const quantityError = document.getElementById('quantity-error');


// Validar nombre del producto
function validateName() {
    const productName = productNameInput.value.trim();
    
    if (productName === '') {
        nameError.textContent = 'Por favor ingresa un nombre para el producto';
        return false;
    }
    
    if (productName.length < 2) {
        nameError.textContent = 'El nombre debe tener al menos 2 caracteres';
        return false;
    }
    
    nameError.textContent = '';
    return true;
}

// Validar cantidad del producto
function validateQuantity() {
    const productQuantity = parseInt(productQuantityInput.value);
    
    if (isNaN(productQuantity) || productQuantity < 1) {
        quantityError.textContent = 'La cantidad debe ser un número mayor a 0';
        return false;
    }
    
    quantityError.textContent = '';
    return true;
}

// Mostrar u ocultar mensaje de lista vacía
function toggleEmptyMessage() {
    if (products.length === 0) {
        emptyMessage.style.display = 'block';
        productList.style.display = 'none';
    } else {
        emptyMessage.style.display = 'none';
        productList.style.display = 'block';
    }
}

// Manejar el envío del formulario
function handleFormSubmit(event) {
    event.preventDefault();
    
    console.log('init');

    // Validar formulario
    const isNameValid = validateName();
    const isQuantityValid = validateQuantity();
    
    if (!isNameValid || !isQuantityValid) {
        return;
    }
    
    // Obtener valores del formulario
    const productName = productNameInput.value.trim();
    const productQuantity = parseInt(productQuantityInput.value);
    
    // Crear nuevo producto
    const newProduct = {
        id: productIdCounter++,
        name: productName,
        quantity: productQuantity,
    };
}

function initApp() {
    
    // Configurar evento del formulario
    productForm.addEventListener('submit', handleFormSubmit);
    
    // Configurar validación en tiempo real
    productNameInput.addEventListener('input', validateName);
    productQuantityInput.addEventListener('input', validateQuantity);
}


// Inicializar la aplicación cuando se carga la página
document.addEventListener('DOMContentLoaded', initApp);