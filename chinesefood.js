const btnCart=document.querySelector('#cart-icon');
const cart=document.querySelector('.cart');
const btnClose=document.querySelector('#cart-close');

btnCart.addEventListener('click',()=>{
  cart.classList.add('cart-active');
});

btnClose.addEventListener('click',()=>{
  cart.classList.remove('cart-active');
});

document.addEventListener('DOMContentLoaded',loadFood);

function loadFood(){
  loadContent();

}

function loadContent(){
  //Remove items
  let btnRemove=document.querySelectorAll('.cart-remove');
  btnRemove.forEach((btn)=>{
    btn.addEventListener('click',removeItem);
  });

  //Product change
  let qtyElements=document.querySelectorAll('.cart-quantity');
  qtyElements.forEach((input)=>{
    input.addEventListener('change',changeQty);
  });


  
  let cartBtns=document.querySelectorAll('.add-cart');
  cartBtns.forEach((btn)=>{
    btn.addEventListener('click',addCart);
  });

  updateTotal();
}



function removeItem(){
  if(confirm('Are You Sure To Remove')){
    let title=this.parentElement.querySelector('.cart-food-title').innerHTML;
    itemList=itemList.filter(el=>el.title!=title);
    this.parentElement.remove();
    loadContent();
  }
}


function changeQty(){
  if(isNaN(this.value) || this.value<1){
    this.value=1;
  }
  loadContent();
}

let itemList=[];


function addCart(){
 let food=this.parentElement;
 let title=food.querySelector('.food-title').innerHTML;
 let price=food.querySelector('.food-price').innerHTML;
 let imgSrc=food.querySelector('.food-img').src;

 
 let newProduct={title,price,imgSrc}


 if(itemList.find((el)=>el.title==newProduct.title)){
  alert("Product Already added in Cart");
  return;
 }else{
  itemList.push(newProduct);
 }


let newProductElement= createCartProduct(title,price,imgSrc);
let element=document.createElement('div');
element.innerHTML=newProductElement;
let cartBasket=document.querySelector('.cart-content');
cartBasket.append(element);
loadContent();
}


function createCartProduct(title,price,imgSrc){

  return `
  <div class="cart-box">
  <img src="${imgSrc}" class="cart-img">
  <div class="detail-box">
    <div class="cart-food-title">${title}</div>
    <div class="price-box">
      <div class="cart-price">${price}</div>
       <div class="cart-amt">${price}</div>
   </div>
    <input type="number" value="1" class="cart-quantity">
  </div>
  <ion-icon name="trash" class="cart-remove"></ion-icon>
</div>
  `;
}

function updateTotal()
{
  const cartItems=document.querySelectorAll('.cart-box');
  const totalValue=document.querySelector('.total-price');

  let total=0;

  cartItems.forEach(product=>{
    let priceElement=product.querySelector('.cart-price');
    let price=parseFloat(priceElement.innerHTML.replace("Rp.",""));
    let qty=product.querySelector('.cart-quantity').value;
    total+=(price*qty);
    product.querySelector('.cart-amt').innerText="Rp."+(price*qty);

  });

  totalValue.innerHTML='Rp.'+total;




  const cartCount=document.querySelector('.cart-count');
  let count=itemList.length;
  cartCount.innerHTML=count;

  if(count==0){
    cartCount.style.display='none';
  }else{
    cartCount.style.display='block';
  }


}

// filter bar
document.addEventListener('DOMContentLoaded', function() {

  const filterButtons = document.querySelectorAll('#filter-buttons button');
  const foodBoxes = document.querySelectorAll('.food-box');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');
      
      
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      
      foodBoxes.forEach(box => {
        if (filter === 'all' || box.getAttribute('data-name') === filter) {
          box.style.display = 'block';
        } else {
          box.style.display = 'none';
        }
      });
    });
  });
});

// search bar
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.querySelector('.searchTerm');
  const foodBoxes = document.querySelectorAll('.food-box');

  searchInput.addEventListener('input', function() {
    const filter = searchInput.value.toLowerCase();
    foodBoxes.forEach(box => {
      const title = box.querySelector('.food-title').textContent.toLowerCase();
      if (title.includes(filter)) {
        box.style.display = 'block';
      } else {
        box.style.display = 'none';
      }
    });
  });
});

// place order
document.addEventListener("DOMContentLoaded", function() {
  const placeOrderButton = document.getElementById("place-order-button");

  if (placeOrderButton) {
    placeOrderButton.addEventListener("click", function() {
      alert("Your order has been entered into our data, please wait");
    });
  }
});
