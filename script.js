// Product storage aur display
let products = [];
let editingId = null; // agar koi product edit ho raha hai to uski id yahan store hogi

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

// Add ya Update product (dono ke liye same function)
function addProduct(event) {
    event.preventDefault();

    const name = document.getElementById('productName').value;
    const description = document.getElementById('productDesc').value;
    const price = document.getElementById('productPrice').value; // optional ab
    const image = document.getElementById('productImage').value;
    const affiliateLink = document.getElementById('affiliateLink').value;

    if (!name || !affiliateLink) {
        alert('Product name aur Amazon link zaroori hain!');
        return;
    }

    if (editingId) {
        // EDIT MODE: purane product ko update karo
        const index = products.findIndex(p => p.id === editingId);
        if (index !== -1) {
            products[index] = {
                id: editingId,
                name: name,
                description: description,
                price: price || null,
                image: image || null,
                affiliateLink: affiliateLink
            };
        }
        editingId = null;
        document.getElementById('formTitle').innerHTML = '<span class="form-icon">+</span> Add a New Find';
        document.getElementById('submitBtn').textContent = 'Add to Shelf';
        document.getElementById('cancelEditBtn').style.display = 'none';
        alert('Product update ho gaya! ✅');
    } else {
        // ADD MODE: naya product banao
        const product = {
            id: Date.now(),
            name: name,
            description: description,
            price: price || null,
            image: image || null,
            affiliateLink: affiliateLink
        };
        products.unshift(product); // naya product sabse upar dikhega
        alert('Product add ho gaya! 🎉');
    }

    saveProducts();
    displayProducts();

    // Form clear karo
    document.getElementById('productForm').reset();
}

// Edit button dabane par form mein purani values bhar do
function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    editingId = id;

    document.getElementById('productName').value = product.name;
    document.getElementById('productDesc').value = product.description || '';
    document.getElementById('productPrice').value = product.price || '';
    document.getElementById('productImage').value = product.image || '';
    document.getElementById('affiliateLink').value = product.affiliateLink;

    document.getElementById('formTitle').textContent = '✏️ Edit This Find';
    document.getElementById('submitBtn').textContent = 'Save Changes';
    document.getElementById('cancelEditBtn').style.display = 'block';

    // Form tak scroll kar do taaki user ko dikhe
    document.getElementById('productForm').scrollIntoView({ behavior: 'smooth' });
}

// Edit cancel karne ke liye
function cancelEdit() {
    editingId = null;
    document.getElementById('productForm').reset();
    document.getElementById('formTitle').innerHTML = '<span class="form-icon">+</span> Add a New Find';
    document.getElementById('submitBtn').textContent = 'Add to Shelf';
    document.getElementById('cancelEditBtn').style.display = 'none';
}

// Display all products
function displayProducts() {
    const grid = document.getElementById('productsGrid');
    const count = document.getElementById('productCount');

    count.textContent = `${products.length} Finds`;

    if (products.length === 0) {
        grid.innerHTML = '<div class="empty-state"><p>Koi product nahi. Upper form se add karo!</p></div>';
        return;
    }

    grid.innerHTML = products.map(product => `
        <div class="product-card">
            ${product.image ? `<img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22150%22%3E%3Crect fill=%22%23F7F3EA%22 width=%22200%22 height=%22150%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2214%22 fill=%22%236B7B76%22 text-anchor=%22middle%22 dy=%22.3em%22%3ENo Image%3C/text%3E%3C/svg%3E'">` : ''}
            <div class="product-content">
                <h3>${product.name}</h3>
                ${product.description ? `<p>${product.description.substring(0, 60)}${product.description.length > 60 ? '...' : ''}</p>` : ''}
                <div class="product-footer">
                    ${product.price
                        ? `<div class="product-price">$${product.price}</div>`
                        : `<div class="product-price no-price">See price on Amazon</div>`
                    }
                    <div class="product-actions">
                        <button class="btn-edit" onclick="editProduct(${product.id})">Edit</button>
                        <button class="btn-delete" onclick="deleteProduct(${product.id})">Delete</button>
                    </div>
                </div>
                <a href="${product.affiliateLink}" target="_blank" class="btn-buy">View on Amazon</a>
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
document.getElementById('cancelEditBtn').addEventListener('click', cancelEdit);

// Page load karte waqt products load karo
window.addEventListener('load', loadProducts);
