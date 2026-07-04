const SHEET_ID = "1r7iY0sippv8hpAHNbYMuMDGEWzfN_xm4CFcv2RXzUG8";

async function loadProducts() {
  const grid = document.getElementById("product-grid");

  try {
    const response = await fetch(
      `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`
    );

    const text = await response.text();
    const json = JSON.parse(text.substring(47).slice(0, -2));

    const rows = json.table.rows;

    grid.innerHTML = "";

    rows.forEach((row) => {

      const title = row.c[0]?.v || "Product";
      const image = row.c[1]?.v || "https://picsum.photos/500";
      const link = row.c[2]?.v || "#";

      const priceValue = row.c[3]?.v;
      const price = priceValue ? "$" + priceValue : "Check Amazon";

      const category = row.c[4]?.v || "Other";

      grid.innerHTML += `
        <div class="card" data-category="${category}">
          <img src="${image}" alt="${title}">
          <div class="card-content">
            <h3>${title}</h3>
            <p class="price">${price}</p>
            <a href="${link}" target="_blank" rel="noopener noreferrer" class="btn">
              View on Amazon
            </a>
          </div>
        </div>
      `;
    });

  } catch (error) {
    console.error(error);
    grid.innerHTML =
      "<h3 style='text-align:center'>Products failed to load</h3>";
  }
}

/* Search */
document.addEventListener("input", function(e) {

  if (e.target.id === "searchInput") {

    const value = e.target.value.toLowerCase();

    document.querySelectorAll(".card").forEach(card => {

      const title = card.querySelector("h3").textContent.toLowerCase();

      card.style.display =
        title.includes(value) ? "block" : "none";

    });
  }
});

/* Category Filter */
document.addEventListener("click", function(e) {

  if (e.target.classList.contains("category")) {

    const selected = e.target.dataset.category;

    document.querySelectorAll(".card").forEach(card => {

      if (
        selected === "All" ||
        card.dataset.category === selected
      ) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }

    });

  }

});

document.addEventListener("DOMContentLoaded", loadProducts);
