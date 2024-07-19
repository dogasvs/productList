let products = [];
let card = [];

function createProductHtml(product) {
  return `<div class="productItem">
     <img src="${product.image.desktop}" alt="${product.name}">
     <button id="ıtemAddBtn" data-id="${product.id}"> <img src="assets/img/shopping.svg" alt=""> Add to Cart </button>
     <p>${product.category}</p>
     <h2>${product.name}</h2>
     <h3> $ ${product.price}</h3>
     </div>`;
}

function handleAddBtnClick() {
  addToCard(Number(this.dataset.id))
}

function addToCard(productId) {
  const cardItem = card.find(x => x.productId === productId);
  if(cardItem) {
    cardItem.quantity++;
  } else {
    const product = products.find(x => x.id === productId);
    card.push(
      {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      }
    );
  }
  renderCard();
}

//card kısmına yazdırma
function renderCard() {
  cardList.innerHTML = card.map(x => `<div class="cardProductItem"> 
  <div class="cardProductInfo"> 
    <h3> ${x.name} </h3>
  <div class="cardProductPrice"> 
    <h4> ${x.quantity}x </h4>
    <p> @ $${x.price} </p>
    <strong> $${x.quantity * x.price} </strong> 
   </div>
    </div>
  <div class="deleteCard">
  <button class="deleteFromCard" data-productid="${x.productId}"> <img src="assets/img/delete.svg" alt=""> </button> </div>
  </div>`).join('');

  document.querySelectorAll('.deleteFromCard').forEach(x => x.addEventListener('click', handleDeleteBtn));

  totalValue.innerHTML = 'Order Total  ' + '$' + card.reduce((currentValue, item) => currentValue + (item.quantity * item.price), 0);

  salesTotal.innerHTML = '(' + card.reduce(function(currentValue, item) {
    return currentValue + item.quantity;
  }, 0) + ')';
}

//silme 
function handleDeleteBtn() {
  card = card.filter(x => x.productId !== Number(this.dataset.productid));
  renderCard();
}

// function OrderDetayiGoster(product) {
//   modal.innerHTML = `
//   <div class="modal-container">
//     <h1>Order Confirmed</h1>
//     <div class="modalTotal">
//       <p>$${salestotal}</p>
//     </div>
//   </div>
//   <button class="startNewBtn">Start New Order</button>
// </div>`;
//   modal.showModal();
// }

fetch('https://dummyjson.czaylabs.com.tr/api/products')
  .then(res => res.json())
  .then(res => {
    products = res.data;
    productsList.innerHTML = products.map(product => createProductHtml(product)).join('');
    document.querySelectorAll('.productItem button').forEach(x => x.addEventListener('click', handleAddBtnClick));
  })

