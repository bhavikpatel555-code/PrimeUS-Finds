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

      let price = row.c[3]?.v || "";
      if (price && !String(price).includes("$")) {
        price = "$" + price;
      }

      grid.innerHTML += `
        <div class="card">
          <img src="${image}" alt="${title}">
          <div class="card-content">
            <h3>${title}</h3>
            <p class="price">${price || "Check Amazon"}</p>
            <a href="${link}" target="_blank" class="btn">
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

document.addEventListener("DOMContentLoaded", loadProducts);
