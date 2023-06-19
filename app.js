let products;
// select Elements
const productEl = document.getElementById("home_products");
const cartItemsEl = document.getElementById("product_table");
const subtotalEl = document.querySelector(".subtotal");
const totalItemsInCart = document.getElementById("totalCost");

// render products
function renderProducts() {
  fetch("https://fakestoreapi.com/products")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      products = data;
      products.forEach((product) => {
        productEl.innerHTML += `
    <div class="card col-10 "">
   <img class="card-img-top img" src="${product.image}" alt="Card image">
    <div class="card-body d-flex flex-column">
    <h5 class="card-title">${product.title}</h5>
     <p class="card-text">${product.price}</p>
     <button id="btn" class="button mt-auto" onclick="addToCart(${product.id},${product.price})">add to cart </button>
     </div>
     </div>
    `;
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
renderProducts();

//cart array
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

//ADD TO CART FUNCTION
function addToCart(id,price) {
  //check if product is already exist in cart
  if (cart.some((item) => item.id === id)) {
    changeNumberOfUnits("plus", id, price);
  } else {
    const item = products.find((product) => product.id === id);

    cart.push({ ...item, numOfUnits: 1, price });
  }
  updateCart();
}
//cart update function
function updateCart() {
  renderCartItems();
  renderSubtotal();

  //save cart to local storage
  localStorage.setItem("CART", JSON.stringify(cart));
}

// calculate and render subtotal
function renderSubtotal() {
  let totalPrice = 0,
    totalItems = 0;
  cart.forEach((item) => {
    totalPrice += item.price * item.numOfUnits;
    totalItems += item.numOfUnits;
  });
  subtotalEl.innerHTML = `Subtotal (${totalItems} items): $${totalPrice.toFixed(
    2
  )}`;
  totalItemsInCart.innerHTML = totalItems;
}

// render cart Items
function renderCartItems() {
  cartItemsEl.innerHTML = " "; // clear cart items
  cart.forEach((item) => {
    cartItemsEl.innerHTML += `
            <tr class="remove_TableData">
            <td style=" word-wrap:break-word;"><span>${item.title}</span></td>
            <td style=" word-wrap:break-word;">${item.price}</td>
            <td style=" word-wrap:break-word;"><img class="table_image" src="${item.image}" alt="image"></td>
            <td class="wrapper"> <span rol="button" class="minus" onclick="changeNumberOfUnits('minus', ${item.id},${item.price})">-</span> <span class="numOfUnits">${item.numOfUnits}</span><span class="plus" onclick="changeNumberOfUnits('plus', ${item.id}, ${item.price})">+</span> </td>
            <td style=" word-wrap:break-word;"> <button class="removeButton" onclick="removeItemsFromCart(${item.id})"><i class="fa fa-trash fs-5" aria-hidden="true"></i></button></td>
            </tr>
        `;
  });
}
// remove items from cart
function removeItemsFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCart();
}

function changeNumberOfUnits(action, id, price) {
    let updatedCart = cart.map((item) => {
      if (item.id === id) {
        let numOfUnits = item.numOfUnits;
        let totalPrice = price * numOfUnits;
        console.log(totalPrice);
        if (action === "minus" && numOfUnits > 1) {
          numOfUnits--;
          totalPrice = price * numOfUnits;
        } else if (action === "plus") {
          numOfUnits++;
          totalPrice = price * numOfUnits;
        }
        
        return {
          ...item,
          numOfUnits: numOfUnits,
          price: totalPrice,
        };
      }
      
      return item;
    });
    
    cart = updatedCart;
    updateCart();
  }
  

// change number of units for an item
// function changeNumberOfUnits(action, id, price) {
//     cart = cart.map((item) => {
//         let NumberOfUnits = item.numOfUnits;
//         let total;
//     if (item.id === id) {
//       if (action === "minus" && NumberOfUnits > 1) {
//         NumberOfUnits--;
//         total = price * NumberOfUnits;
//        console.log(total);

//     //    let minusprice = price - NumberOfUnits;
//       } else if (action === "plus") {
//         NumberOfUnits++;
//         total = price * NumberOfUnits;
//        console.log(total);
//       }
//     }
//     return {
//       ...item,
//       numOfUnits: NumberOfUnits,
//       total: total,
//         };
//   });
//   updateCart();
// }
// function clearAll(){
//     cartItemsEl.innerHTML = '';
//     subtotalEl.innerHTML = `Subtotal (0 items): $0`
//     totalItemsInCart.innerHTML = 0;
//     localStorage.clear();
// }
