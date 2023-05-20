
    // hitting a api 
    fetch("https://fakestoreapi.com/products").then((response)=>{
        return response.json();
    }).then((data)=>{
        console.log(data);
        let product = "";
        data.map((value)=>{
product += `<div class="card col-10 "">
   <img class="card-img-top img" src="${value.image}" alt="Card image">
     <div class="card-body d-flex flex-column">
       <h5 class="card-title">${value.title}</h5>
    <p class="card-text">${value.price}</p>
     <button class="button mt-auto" onclick="${add(value)}">add to cart </button>
     </div>
   </div>`
        })
        document.getElementById("home_products").innerHTML = product;
    })
  
    
    
   
   

var totalItems = 0;
document.getElementById('totalCost').innerText = totalItems;

// adding items into cart 
function add(val){

    document.getElementById("product_table").innerHTML += `<tbody>
    <tr>
      <th scope="row">${val.title}</th>
      <td>${val.price}</td>
      <td><img class="table_image" src="${val.image}" alt="image"></td>
      <td><i class="fa fa-trash" aria-hidden="true"></i></td>
    </tr>
    </tbody>`
    totalItems = totalItems+1;
    document.getElementById('totalCost').innerText = totalItems;
}

// removing item from cart 
function remove (){
    var listItem = document.getElementsByClassName('liID');
    for (var i = 0; i<listItem.length; i++){
        listItem[i].onclick=function(){
            this.parentNode.removeChild(this);
        }
    }
    totalItems = totalItems-1;
    document.getElementById('totalCost').innerText = totalItems;
}
