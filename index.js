let a = 1;
const cartData = {};
// var totalItems = 0;
// document.getElementById("totalCost").innerText = totalItems;

// // remove function for removing data from cart
// function remove(id) {
//   var listItem = document.getElementsByClassName("remove_TableData");
//   for (var i = 0; i < listItem.length; i++) {
//     listItem[i].onclick = function () {
//       this.parentNode.removeChild(this);
//     };
//   }
//   totalItems = totalItems - 1;
//   document.getElementById("totalCost").innerText = totalItems;
// }

// function plus(id) {
//   let num = document.getElementById(`${id}`);
//   // let price1 = document.getElementById(`${price}`);
//   let value = parseInt(num.innerText);
//   // let sumPrice = parseInt(price1.innerHTML);
//   // console.log(sumPrice);
//   value += 1;
//   value = value < 10 ? "0" + value : value;
//   num.innerText = value;
// }

// function minus(id) {
//   const num = document.getElementById(`${id}`);
//   let value2 = parseInt(num.innerText);
//   if (value2 > 1) {
//     value2--;
//     value2 = value2 < 10 ? "0" + value2 : value2;
//     num.innerText = value2;
//   }
// }
// function clearAll() {
//   document.getElementById("cartList").innerHTML = "";
//   totalItems = 0;
//   document.getElementById("totalCost").innerText = totalItems;
// }

// add function for adding data into cart
// function add(id, title, price, image) {
//   document.getElementById(
//     "cartList"
//   ).innerHTML += `<tr class="remove_TableData">
//         <td style=" word-wrap:break-word;"><span style="word-wrap:break-word;">${title}</span></td>
//         <td style=" word-wrap:break-word;">${price}</td>
//         <td style=" word-wrap:break-word;"><img class="table_image" src="${image}" alt="image"></td>
//         <td class="wrapper"> <span rol="button" onclick="minus(${id})" class="minus">-</span> <span class="quntity" id="${id}">01</span><span onclick="plus(${id})" class="plus">+</span> </td>
//         <td style=" word-wrap:break-word;"> <button onclick="remove()"><i class="fa fa-trash" aria-hidden="true"></i></button></td>
//       </tr>`;
//   totalItems = totalItems + 1;
//   document.getElementById("totalCost").innerText = totalItems;
// }

// const plus = document.querySelector(".plus");
// const minus = document.querySelector(".minus");
// const num = document.querySelector(".num");
// let a = 1;
// plus.addEventListener("click", ()=>{
//     a++;
//     // a = (a < 10) ? "0" + a : a;
//     num.innerText = a;
//     console.log(a);
// })
// minus.addEventListener("click", ()=>{
//     if(a>1){
//         a--;
//         // a = (a < 10) ? "0" + a : a;
//     num.innerText = a;
//     }
// })

fetch("https://fakestoreapi.com/products")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    cart = data;
    let productElement = " ";
    const productsContainer = document.getElementById('productsContainer');

    data.forEach((product) => {
      productElement += `<div class="card col-10 "">
        <img class="card-img-top img" src="${product.image}" alt="Card image">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">${product.price}</p>
          <button class="addToCartBtn mt-auto" data-id="${product.id}" data-price="${product.price}">Add to Cart</button>
          <input class="quantityInput" type="number" min="1" value="1">
        </div>
      </div>`;
      document.getElementById("productsContainer").innerHTML = productElement;
    });
    const addToCartButtons = document.getElementsByClassName('addToCartBtn');
    const quantityInputs = document.getElementsByClassName('quantityInput');
    const cartList = document.getElementById('cartList');
    const updateCartDisplay = () => {
      // Clear the cart list
      cartList.innerHTML = '';

      // Iterate over the cart data and display each item
      for (const itemId in cartData) {
        const cartItem = document.createElement('li');
        const { price, quantity } = cartData[itemId];
        const totalAmount = price * quantity;
        cartItem.textContent = `Item ID: ${itemId} - Quantity: ${quantity} - Total Amount: $${totalAmount}`;
        cartList.appendChild(cartItem);
      }
    };
// Event listeners for the add to cart buttons
Array.from(addToCartButtons).forEach(button => {
  button.addEventListener('click', () => {
    const itemId = button.dataset.id;
    const price = parseFloat(button.dataset.price);
    const quantity = parseInt(quantityInputs[button.dataset.id - 1].value);

    // Add item to cart data or update its quantity
    if (cartData[itemId]) {
        cartData[itemId].quantity += quantity;
        cartData[itemId].price += price;
    } else {
      cartData[itemId] = { price, quantity };
    }

    // Update the cart display
    updateCartDisplay();
  });
});
})
.catch(error => {
console.error('Error fetching products:', error);
});
