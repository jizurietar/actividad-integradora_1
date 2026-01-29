// Variables globales
let products = [];
let productIdCounter = 1;

const productForm = document.getElementById('product-form');
const productNameInput = document.getElementById('product-name');
const productQuantityInput = document.getElementById('product-quantity');
const productList = document.getElementById('product-table-body');
const emptyMessage= document.getElementById('empty-message');
const totalProductsElement = document.getElementById('total-products');

// Mensajes de error
const nameError = document.getElementById('name-error');
const quantityError = document.getElementById('quantity-error');

// Limpiar mensajes de error
function clearErrors() {
    nameError.textContent = '';
    quantityError.textContent = '';
}

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

// Eliminar producto
function deleteProduct(productId) {
    // Confirmar eliminación
    if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) {
        return;
    }
    
    // Filtrar el producto del array
    products = products.filter(p => p.id !== productId);
    
    // Guardar en localStorage
    saveProductsToStorage();
    
    // Actualizar visualización
    renderProductList();
    
    // Mostrar/ocultar mensaje de lista vacía
    toggleEmptyMessage();
}

// Renderizar toda la lista de productos
function renderProductList() {
    // Limpiar lista actual
    productList.innerHTML = '';
    
    // Renderizar cada producto
    products.forEach(product => {
        renderProductItem(product);
    });
}

// Guardar productos en localStorage
function saveProductsToStorage() {
    localStorage.setItem('shoppingListProducts', JSON.stringify(products));
}

// Cargar productos desde localStorage
function loadProductsFromStorage() {
    const storedProducts = localStorage.getItem('shoppingListProducts');
    
    if (storedProducts) {
        products = JSON.parse(storedProducts);
        
        // Encontrar el ID más alto para continuar la numeración
        if (products.length > 0) {
            productIdCounter = Math.max(...products.map(p => p.id)) + 1;
        }
        
        // Renderizar los productos cargados
        renderProductList();
    }
}

// Renderizar un elemento de producto
function renderProductItem(product) {
    // Crear elemento de lista
    const listItem = document.createElement('tr');
    listItem.dataset.id = product.id;
    
    // Crear contenido del producto
    listItem.innerHTML = `
        <td class="product-name-cell">
            <div class="product-name">${product.name}</div>
        </td>
        <td class="product-quantity-cell">
            <div class="product-quantity">Cantidad: ${product.quantity}</div>
        </td>
        <td class="product-actions-cell">
            <button class="action-btn delete-btn" title="Eliminar producto" data-id="${product.id}">
                -
            </button>
        </td>
    `;
    console.log(listItem);
    // Agregar a la lista
    productList.appendChild(listItem);
    
    // Configurar eventos para los botones
    const deleteBtn = listItem.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => deleteProduct(product.id));
}

// Manejar el envío del formulario
function handleFormSubmit(event) {
    event.preventDefault();
    
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

    // Agregar producto al array
    products.push(newProduct);

    // Guardar en localStorage
    saveProductsToStorage();

    // Renderizar el producto en la lista
    renderProductItem(newProduct);

    // Mostrar/ocultar mensaje de lista vacía
    toggleEmptyMessage();
    
    // Limpiar formulario
    productForm.reset();
    productQuantityInput.value = 1;

    // Limpiar mensajes de error
    clearErrors();
}

function initApp() {
    
    // Cargar productos desde localStorage
    loadProductsFromStorage();

    // Mostrar/ocultar mensaje de lista vacía
    toggleEmptyMessage();

    // Configurar evento del formulario
    productForm.addEventListener('submit', handleFormSubmit);
    
    // Configurar validación en tiempo real
    productNameInput.addEventListener('input', validateName);
    productQuantityInput.addEventListener('input', validateQuantity);
}


// Inicializar la aplicación cuando se carga la página
document.addEventListener('DOMContentLoaded', initApp);