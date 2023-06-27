function fetchUnfilteredData() {
  return fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) => json);
}

function renderUnfilteredProducts(data) {
  const content = document.querySelector(".content");

  content.innerHTML = data
    .map(
      (item) => `
    <div class="col-3 card mb-2">
      <img src="${item.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${item.title}</h5>
        <p class="card-text">${item.price}$</p>
        <a href="product.html?id=${item.id}" class="btn btn-primary">
          See more
        </a>
      </div>
    </div>
    `
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  fetchUnfilteredData().then((data) => {
    renderUnfilteredProducts(data);
  });
});
