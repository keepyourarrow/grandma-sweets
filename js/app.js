let totalItems;
let totalPrice;
let cartLength;
// show cart
document.getElementById("cart-info").addEventListener("click", showCart);
document.getElementById("clear-cart").addEventListener("click", clearCart);
cartIconClicked();

//add items to cart
function cartIconClicked() {
  let cartIcon = document.querySelectorAll(".store-item-icon");
  for (let i = 0; i < cartIcon.length; i++) {
    cartIcon[i].addEventListener("click", function(e) {
      if (e.target.parentElement.classList.contains("store-item-icon")) {
        //getting image <source/>
        let imgSrc = e.target.parentElement.previousElementSibling.src;
        let pos = imgSrc.indexOf("img") + 3;
        let newImgSrc = imgSrc.substring(pos);
        console.log(newImgSrc);

        let name =
          e.target.parentElement.parentElement.nextElementSibling.children[0]
            .children[0].textContent;
        let price =
          e.target.parentElement.parentElement.nextElementSibling.children[0]
            .children[1].textContent;

        const item = {
          img: `img-cart${newImgSrc}`,
          name,
          price: +price.substring(2)
        };
        console.log(item);
        //add to cart
        addToCart(item);
      }
    });
  }
}

//add to cart function
function addToCart(item) {
  const cartItem = document.createElement("div");
  cartItem.classList.add(
    "cart-item",
    "d-flex",
    "justify-content-between",
    "text-capitalize",
    "my-3"
  );
  cartItem.innerHTML = `<img src="${item.img}" class="rounded-circle" id="item-img" alt="">
    <div class="item-text text-center">
      <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
      <span>$</span>
      <span id="cart-item-price" class="cart-item-price mb-0">${item.price}.00</span>
    </div>
    <a href="#" id="cart-item-remove" class="cart-item-remove" data-toggle="tooltip" data-placement="top" title="Remove item">
      <i class="fa fa-trash"></i>
    </a>`;

  //remove from cart
  cartItem.children[2].addEventListener("click", removeFromCart);

  //select cart
  let cart = document.querySelector("#cart");
  let total = document.querySelector(".cart-total-container");
  //remove $ sign
  let price = +total.children[1].textContent.substring(1);
  price += item.price;
  totalPrice = price;
  //update total
  total.children[1].textContent = "$" + totalPrice + ".00";
  //update nav total
  cartLength = cart.children.length - 1;
  updateNavTotal(totalPrice);

  cart.insertBefore(cartItem, total);

  alert("Item added to the cart");
}
function updateNavTotal(totalPrice) {
  //updating total
  let cartInfo = document.querySelector("#cart-info");
  cartInfo.children[1].children[2].textContent = totalPrice + ".00";

  //updating items count
  cartInfo.children[1].children[0].textContent = cartLength;

  cartInfo.children[1].children[1].textContent =
    cartLength === 1 ? "item" : "items";
}
//remvoeFromCart function
function removeFromCart(e) {
  console.log("worked");
  //updateTotal
  console.log(e.target.parentElement.previousElementSibling);

  let price =
    e.target.parentElement.previousElementSibling.children[2].textContent;
  totalPrice -= price;
  cartLength -= 1;
  updateNavTotal(totalPrice);
  document.querySelector(".cart-total-container").children[1].textContent =
    "$" + totalPrice + ".00";
  //updating items count
  e.target.parentElement.parentElement.remove();
}
//show cart function
function showCart() {
  const cart = document.getElementById("cart");
  cart.classList.toggle("show-cart");
  console.log(cart);
}
//clear whole cart
function clearCart(e) {
  const cart = document.getElementById("cart");
  let arr = [...e.target.parentElement.parentElement.children];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].classList.contains("cart-item")) {
      arr[i].remove();
      document.querySelector(".cart-total-container").children[1].textContent =
        "$ 0.00";
      cartLength = 0;
      updateNavTotal(0);
    }
  }
}
