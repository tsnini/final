const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

const cartContainer = document.getElementById("cart-container");

if (cartItems.length === 0) {
  cartContainer.innerHTML = "<p>No items in the cart.</p>";
} else {
  const cartItemsHTML = cartItems.map((item) => {
    return `
      <div class="cart-item">
        <img src="${item.image}" alt="Product Image" class="cart-item-image">
        <div class="cart-item-details">
          <h3 class="cart-item-title">${item.title}</h3>
          <p class="cart-item-price">${item.price}$</p>
        </div>
        <button class="btn-remove" onclick="removeFromCart(${item.id})">Remove</button>
        <button class="btn-buy" onclick="buyNow(${item.id}, '${item.title}', ${item.price})">Buy Now</button>
      </div>
    `;
  });

  cartContainer.innerHTML = cartItemsHTML.join("");
}

function removeFromCart(itemId) {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const itemIndex = cartItems.findIndex((item) => item.id === itemId);

  if (itemIndex !== -1) {
    cartItems.splice(itemIndex, 1);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    console.log("Item removed from the cart");

    location.reload();
  }
}

function buyNow(itemId, itemTitle, itemPrice) {
  // Store purchase information in localStorage
  const purchaseInfo = {
    itemId,
    itemTitle,
    itemPrice,
  };

  localStorage.setItem("purchaseInfo", JSON.stringify(purchaseInfo));

  window.location.href = "buy.html";
}
