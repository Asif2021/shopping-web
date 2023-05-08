$(document).ready(async function(e){
    const api = 'https://fakestoreapi.com/products';
    const response = await fetch(api);
    const datas = await response.json();
    datas.forEach((i)=>{
        loadProduct(i);
    })
})
function loadProduct(data){
    var li = document.createElement('li');
    li.innerHTML = `<div class="card justify-content-center">` +
    `<div class="product-1 align-item-center p-2 text-center"> <img src="`+data.image+`" class="rounded" width="150" height="100">` +
    `<h6 class="m-2 font-weight-bold info">`+data.title+` </h6>` +
    `<div class="mt-3"> <span class=" text-1 d-block"> `+data.description+` </span></div>`+
    `<div class="cost mt-1 text-dark"> <span> `+data.price+` </span>`+`</div>` +
    `</div>` +
    `<div class="button-color p-2 text-center text-white"> <span class="text-uppercase"> add to cart</span> </div>` + `</div>`
    document.getElementById("home_products").appendChild(li);

}