document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  fetch(`https://fakestoreapi.com/products/${productId}`)
    .then((res) => res.json())
    .then((product) => {
      const productInfo = document.querySelector(".product-info");
      productInfo.innerHTML = `
      <div class="product">
      <h2>${product.title}</h2>
      <img src="${product.image}" alt="Product Image">
      <p>${product.description}</p>
      <p>Price: ${product.price}$</p>
      <p>Category: ${product.category}</p>
      <button class="btn btn-primary" id="add-to-cart">Add to Cart</button>
      <button class="btn btn-primary" id="buy-now">Buy Now</button>
      <a class="btn btn-primary" href="index.html">Go Shop</a>
      `;

      const addToCartBtn = document.getElementById("add-to-cart");
      const buyNowBtn = document.getElementById("buy-now");

      addToCartBtn.addEventListener("click", () => {
        addToCart(product);
        window.location.href = "cart.html";
      });

      buyNowBtn.addEventListener("click", () => {
        window.location.href = "buy.html";
      });

      // Function to add item to the cart
      // Function to add item to the cart
      function addToCart(item) {
        // Retrieve cart items from localStorage or initialize an empty array
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

        // Check if the item is already in the cart
        const existingItem = cartItems.find(
          (cartItem) => cartItem.id === item.id
        );

        if (existingItem) {
          // Item already exists, display a message or handle it as per your requirement
          alert("This item is already in the cart.");
        } else {
          // Item does not exist in the cart, add it
          cartItems.push(item);
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
          console.log("Item added to the cart");
        }
      }

      // Fetch related products from the same category
      fetch(`https://fakestoreapi.com/products/category/${product.category}`)
        .then((res) => res.json())
        .then((relatedProducts) => {
          const relatedProductsSection = document.createElement("div");
          relatedProductsSection.classList.add("related-products");

          const relatedProductsTitle = document.createElement("h3");
          relatedProductsTitle.textContent = "You May Like";
          relatedProductsSection.appendChild(relatedProductsTitle);

          const relatedProductsRow = document.createElement("div");
          relatedProductsRow.classList.add("row");

          relatedProducts.forEach((item) => {
            const cardCol = document.createElement("div");
            cardCol.classList.add("col-3", "card", "mb-2");
            const cardImg = document.createElement("img");
            cardImg.src = item.image;
            cardImg.alt = "Product Image";
            cardImg.classList.add("card-img-top");
            cardCol.appendChild(cardImg);

            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body");

            const cardTitle = document.createElement("h5");
            cardTitle.classList.add("card-title");
            cardTitle.textContent = item.title;
            cardBody.appendChild(cardTitle);

            const cardPrice = document.createElement("p");
            cardPrice.classList.add("card-text");
            cardPrice.textContent = `${item.price}$`;
            cardBody.appendChild(cardPrice);

            const seeMoreLink = document.createElement("a");
            seeMoreLink.href = `product.html?id=${item.id}`;
            seeMoreLink.classList.add("btn", "btn-primary");
            seeMoreLink.textContent = "See more";
            cardBody.appendChild(seeMoreLink);

            cardCol.appendChild(cardBody);
            relatedProductsRow.appendChild(cardCol);
          });

          relatedProductsSection.appendChild(relatedProductsRow);
          productInfo.appendChild(relatedProductsSection);
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
});
