const purchaseInfo = JSON.parse(localStorage.getItem("purchaseInfo"));

const itemTitleElement = document.getElementById("item-title");
const itemPriceElement = document.getElementById("item-price");

if (purchaseInfo) {
  itemTitleElement.textContent = purchaseInfo.itemTitle;
  itemPriceElement.textContent = purchaseInfo.itemPrice + "$";
} else {
  itemTitleElement.textContent = "No item selected";
  itemPriceElement.textContent = "";
}

const creditCardForm = document.getElementById("credit-card-form");
creditCardForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const cardNumber = document.getElementById("card-number").value;
  const cardHolder = document.getElementById("card-holder").value;
  const expirationDate = document.getElementById("expiration-date").value;
  const cvv = document.getElementById("cvv").value;

  console.log("Credit Card Information:");
  console.log("Card Number:", cardNumber);
  console.log("Card Holder:", cardHolder);
  console.log("Expiration Date:", expirationDate);
  console.log("CVV:", cvv);

  creditCardForm.reset();

  const successMessageElement = document.getElementById("success-message");
  successMessageElement.textContent = "Successful purchase!";
});
