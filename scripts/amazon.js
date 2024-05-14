//step-1 -> save the data in JS done in product.js file in data
let productsHTML = ``;  //string to combine all the generated HTML

// to generate HTML using saved data
products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}     
      </div>

      <div class="product-quantity-container">
        <select>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>  
  `;
});

// next step is to put it on webpage by DOM using another class given to product grid
document.querySelector(`.js-products-grid`).
  innerHTML = productsHTML; 
//now we are generating HTML and putting it on webpage using DOM  

//step 3 -> making it interactive
// making add to cart button interactive using DOM
document.querySelectorAll(`.js-add-to-cart`)
  .forEach((button)=>{
      button.addEventListener('click', ()=>{
        const productId = button.dataset.productId;             //saves id of product on clicking button in the variable
        
        let matchingItem;               //variable to save already exusting item
        // looping cart to check if item exist already
        cart.forEach((item) => {                         
          if(productId === item.productId){
            matchingItem = item;
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
        //making cart quantity icon interactive
        //first calculating quantity
        let cartQuantity = 0;
        cart.forEach((item) => {
          cartQuantity += item.quantity;
        });

        //displaying quantity on webpage
        document.querySelector(`.js-cart-quantity`)
          .innerHTML = cartQuantity;
      });
  });


