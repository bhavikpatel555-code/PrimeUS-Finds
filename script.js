const SHEET_ID = "1r7iY0sippv8hpAHNbYMuMDGEWzfN_xm4CFcv2RXzUG8";

let allProducts = [];

async function loadProducts() {

  const grid = document.getElementById("product-grid");

  try {

    const response = await fetch(
      `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`
    );

    const text = await response.text();
    const json = JSON.parse(text.substring(47).slice(0, -2));

    allProducts = json.table.rows;

    displayProducts(allProducts);

  } catch (error) {

    console.error(error);

    grid.innerHTML =
      "<h3 style='text-align:center'>Products failed to load</h3>";

  }

}

function displayProducts(rows) {

  const grid = document.getElementById("product-grid");

  grid.innerHTML = "";

  rows.forEach((row) => {

    const title = row.c[0]?.v || "Product";
    const image = row.c[1]?.v || "https://picsum.photos/500";
    const link = row.c[2]?.v || "#";
    const price = row.c[3]?.f || row.c[3]?.v || "Check Amazon";
    const category = row.c[4]?.v || "";

    grid.innerHTML += `
      <div class="card" data-category="${category}">
        <img src="${image}" alt="${title}">
        <div class="card-content">

          <div class="badge">🔥 BEST SELLER</div>

          <h3>${title}</h3>

          <div class="rating">
            ⭐⭐⭐⭐⭐ 4.8 (2,184 Reviews)
          </div>

          <ul class="features">
            <li>✓ Top Rated Product</li>
            <li>✓ Great Value For Money</li>
            <li>✓ Fast Amazon Delivery</li>
          </ul>

          <p class="price">${price}</p>

          <a href="${link}" target="_blank" rel="noopener noreferrer" class="btn">
            Check Price On Amazon
          </a>

        </div>
      </div>
    `;

  });

}

function filterByPrice(maxPrice){

  const filtered = allProducts.filter((row)=>{

    const priceText = (row.c[3]?.f || row.c[3]?.v || "").toString();
    const price = parseFloat(priceText.replace(/[^0-9.]/g, ""));

    return !isNaN(price) && price <= maxPrice;

  });

  displayProducts(filtered);

}

// Search
document.addEventListener("input", function(e){

  if(e.target.id === "searchInput"){

    const value = e.target.value.toLowerCase();

    const filtered = allProducts.filter(row=>{

      const title = row.c[0]?.v?.toLowerCase() || "";

      return title.includes(value);

    });

    displayProducts(filtered);

  }

});

// Click Events
document.addEventListener("click", function(e){

  if(e.target.dataset.category){

    e.preventDefault();

    const category = e.target.dataset.category;

    if(category==="All"){
      displayProducts(allProducts);
      return;
    }

    if(category==="Under25"){
      filterByPrice(25);
      return;
    }

    if(category==="Under50"){
      filterByPrice(50);
      return;
    }

    if(category==="Under100"){
      filterByPrice(100);
      return;
    }

    const filtered = allProducts.filter(row=>{

      return row.c[4]?.v === category;

    });

    displayProducts(filtered);

  }

});

document.addEventListener("DOMContentLoaded", loadProducts);
