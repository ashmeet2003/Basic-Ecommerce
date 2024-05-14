export const cart = [];

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
      quantity: 1
    });
  }
}