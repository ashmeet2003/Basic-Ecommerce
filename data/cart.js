export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart = [{
    productId: `e43638ce-6aa0-4b85-b27f-e1d07eb678c6`,
    quantity: 2,
    deliveryOptionId: '1'
  }, {
    productId: `15b6fc6f-327a-4ec4-896f-486349e85a3d`,
    quantity: 1,
    deliveryOptionId: '2' 
  }];
}
// we can use productId to get other details from products datastruc., so no need to save them again in cart datastruc.this is called normalising data

//saving to local storage, so doesn't get lost on refreshing
function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));             //as local storage only stores string
}

export function addToCart(productId){
  let matchingItem;               //variable to save already exusting item
  // looping cart to check if item exist already
  cart.forEach((cartItem) => {                         
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  //if item exist, inc quantity, if not push to cart
  if(matchingItem){                           
    matchingItem.quantity++;
  } else{
    cart.push({                                                 
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1'

    });

    saveToStorage();
  }
}

export function removeFromCart(productId){
  const newCart = [];

  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

//
export function updateDeliveryOption(productId, deliveryOptionId){
  //getting the product from cart
  let matchingItem;               
  cart.forEach((cartItem) => {                         
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });
  //updating it's deliveryOptionId
  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}