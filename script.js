// Arreglo que almacena los productos en el carrito
let cart = [];

// Función: agregar producto al carrito
function addToCart(name, price) {
    const quantityInput = event.target.previousElementSibling;
    const quantity = parseInt(quantityInput.value);

    // Busca si el producto ya está en el carrito
    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ name, price, quantity });
    }

    updateCart();
}

// Función: actualizar visualmente la tabla del carrito
function updateCart() {
    const cartTable = document.getElementById("cartItems");
    const totalDisplay = document.getElementById("total");

    cartTable.innerHTML = ""; // limpia la tabla
    let total = 0;

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price}</td>
            <td>${item.quantity}</td>
            <td>$${subtotal}</td>
        `;
        cartTable.appendChild(row);
    });

    totalDisplay.textContent = `Total: $${total}`;
}

// Función: vaciar carrito
function clearCart() {
    cart = [];
    updateCart();
}

// Función: filtrar productos por búsqueda o categoría
function filterProducts() {
    const search = document.getElementById("searchBox").value.toLowerCase();
    const category = document.getElementById("categoryFilter").value;
    const products = document.querySelectorAll(".product");

    products.forEach(prod => {
        const name = prod.dataset.name.toLowerCase();
        const cat = prod.dataset.category;

        // Mostrar solo si coincide con búsqueda y categoría
        const matchSearch = name.includes(search);
        const matchCategory = (category === "todos" || cat === category);

        prod.style.display = (matchSearch && matchCategory) ? "block" : "none";
    });
}
