
var totalItems = 0;
document.getElementById("totalCost").innerText = totalItems;

// remove function for removing data from cart 
function remove(val) {
  var listItem = document.getElementsByClassName("remove_TableData");
  for (var i = 0; i < listItem.length; i++) {
    listItem[i].onclick = function () {
      this.parentNode.removeChild(this);
    };
  }
  totalItems = totalItems - 1;
  document.getElementById("totalCost").innerText = totalItems;
}

// add function for adding data into cart 
function add(val,title,price,image) {
    console.log(val,title,price, image);
   document.getElementById("product_table").innerHTML += `<tbody class="remove_TableData">
      <tr>
        <td class="title_row">${title}</td>
        <td>${price}</td>
        <td><img class="table_image" src="${image}" alt="image"></td>
        <td> <button onclick="remove(${val})"><i class="fa fa-trash" aria-hidden="true"></i></button></td>
      </tr>
    </tbody>`;
    totalItems = totalItems + 1;
    document.getElementById("totalCost").innerText = totalItems;
  }

fetch("https://fakestoreapi.com/products")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let product = " ";
    data.map((value) => {
       product += `<div class="card col-10 "">
        <img class="card-img-top img" src="${value.image}" alt="Card image">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${value.title}</h5>
          <p class="card-text">${value.price}</p>
          <button class="button mt-auto" onclick="add(${value.id}, '${value.title}', ${value.price}, '${value.image}')">add to cart </button>
        </div>
      </div>`;
    });
    document.getElementById("home_products").innerHTML = product;
  });