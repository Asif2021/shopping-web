$(document).ready(async function(e){
    // hittiing a api 
    const api = 'https://fakestoreapi.com/products';
    // getting response from api 
    const response = await fetch(api);
    // getting data from in json format 
    const datas = await response.json();
    console.log(datas);
    
    datas.map((i)=>{
        // calling function loadProduct and passing data as i 
        loadProduct(i);
    })
})
   
// loadProduct function defination 
function loadProduct(data){
    var li = document.createElement('li');
    li.innerHTML = `<div class="card">` +
    `<div class="product-1 align-item-center p-2 text-center"> <img src="`+data.image+`" class="rounded" width="150" height="100">` +
    `<h6 class="m-2 font-weight-bold info">`+data.title+` </h6>` +
    `<div class="mt-3"> <span class=" text-1 d-block"> `+data.description+` </span></div>`+
    `<div class="cost mt-1 text-dark"> <span> `+data.price+` </span>`+`</div>` +
    `</div>` +
    `<button class="button-color p-2 text-center text-white" onclick="add(`+(data.price)+`)"> Add to Cart</button>` + `</div>`
    document.getElementById("home_products").appendChild(li);

}


var totalItems = 0;
document.getElementById('totalCost').innerText = totalItems;

// adding items into cart 
function add(val){
    document.getElementById("costList").innerHTML += "<li class='liID'>" +val+ `<button onclick="remove()"> X </button> `+"</li>";
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
