$(document).ready(async function(e){
    const api = 'https://fakestoreapi.com/products';
    const response = await fetch(api);
    const datas = await response.json();
    console.log(datas);
    datas.forEach((i)=>{
        loadProduct(i);
    })
})
// var totalCost = 0;
// document.getElementById('totalCost').innerText = totalCost;
    

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
function add(val){
    document.getElementById("costList").innerHTML += "<li>" +val+ "</li>";
    totalItems = totalItems+1;
    document.getElementById('totalCost').innerText = totalItems;
}
