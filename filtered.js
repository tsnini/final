function fetchData() {
  return fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) => json);
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

fetchData().then((data) => {
  const content = document.querySelector(".content");
  const categoryNameElement = document.getElementById("category-name");

  const category = getParameterByName("category");
  const filteredData = category
    ? data.filter((item) => item.category === category)
    : data;

  categoryNameElement.textContent = category ? category : "All Categories";

  content.innerHTML = filteredData
    .map(
      (item) => `
    <div class="col-3 card mb-2">
      <img src="${item.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${item.title}</h5>
        <p class="card-text">${item.price}$</p>
        <a href="product.html?id=${item.id}" class="btn btn-primary">See more</a>
      </div>
    </div>
    `
    )
    .join("");
});
