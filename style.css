// Product storage aur display
let products = [];

// Load products from browser storage
function loadProducts() {
    const saved = localStorage.getItem('myShopProducts');
    if (saved) {
        products = JSON.parse(saved);
    }
    displayProducts();
}

// Save products to browser storage
function saveProducts() {
    localStorage.setItem('myShopProducts', JSON.stringify(products));
}

// Add new product
function addProduct(event) {
    event.preventDefault();

    const name = document.getElementById('productName').value;
    const description = document.getElementById('productDesc').value;
    const price = document.getElementById('productPrice').value;
    const image = document.getElementById('productImage').value;
    const affiliateLink = document.getElementById('affiliateLink').value;

    if (!name || !price || !affiliateLink) {
        alert('Product name, price aur Amazon link zaroori hain!');
        return;
    }

    const product = {
        id: Date.now(),
        name: name,
        description: description,
        price: price,
        image: image || null,
        affiliateLink: affiliateLink
    };

    products.unshift(product); // naya product sabse upar dikhega
    saveProducts();
    displayProducts();

    // Form clear karo
    document.getElementById('productForm').reset();
    alert('Product add ho gaya! 🎉');
}

// Display all products
function displayProducts() {
    const grid = document.getElementById('productsGrid');
    const count = document.getElementById('productCount');

    count.textContent = `${products.length} Products`;

    if (products.length === 0) {
        grid.innerHTML = '<div class="empty-state"><p>Koi product nahi. Upper form se add karo!</p></div>';
        return;
    }

    grid.innerHTML = products.map(product => `
        <div class="product-card">
            ${product.image ? `<img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22150%22%3E%3Crect fill=%22%23e0e0e0%22 width=%22200%22 height=%22150%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2214%22 fill=%22%23999%22 text-anchor=%22middle%22 dy=%22.3em%22%3ENo Image%3C/text%3E%3C/svg%3E'">` : ''}
            <div class="product-content">
                <h3>${product.name}</h3>
                ${product.description ? `<p>${product.description.substring(0, 60)}${product.description.length > 60 ? '...' : ''}</p>` : ''}
                <div class="product-footer">
                    <div class="product-price">₹${product.price}</div>
                    <button class="btn-delete" onclick="deleteProduct(${product.id})">🗑️</button>
                </div>
                <a href="${product.affiliateLink}" target="_blank" class="btn-buy">🛒 Buy on Amazon</a>
            </div>
        </div>
    `).join('');
}

// Delete product
function deleteProduct(id) {
    if (confirm('Ye product delete karna hai?')) {
        products = products.filter(p => p.id !== id);
        saveProducts();
        displayProducts();
    }
}

// Form submit handler
document.getElementById('productForm').addEventListener('submit', addProduct);

// Page load karte waqt products load karo
window.addEventListener('load', loadProducts);
