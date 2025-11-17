import {cart, addToCart} from '../data/cart.js'; 
import {products} from '../data/products.js';
import { formatCurrency } from './utils/money.js';

function renderProductsGrid() {
  //step-1 -> save the data 
  let productsHTML = ``;  

  const url = new URL(window.location.href);
  const search = url.searchParams.get('search');

  let filteredProducts = products;

  // If a search exists in the URL parameters, filter the products that match the search.
  if (search) {
    filteredProducts = products.filter((product) => {
      // search using key words
      let matchingKeyword = false;
      product.keywords.forEach((keyword) => {
        if (keyword.toLowerCase().includes(search.toLowerCase())) {
          matchingKeyword = true;
        }
      });

      return matchingKeyword || product.name.toLowerCase().includes(search.toLowerCase());
    });
  }

  // to generate HTML using saved data
  filteredProducts.forEach((product) => {
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
            src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          $${product.getPrice()}     
        </div>

        <div class="product-quantity-container">
          <select class ="js-quantity-${product.id}">
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

        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-${product.id}">
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

  //step 3 -> making webpage interactive
  function updateCartQuantity(){
    //first calculating quantity
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    //displaying quantity on webpage
    document.querySelector(`.js-cart-quantity`)
      .innerHTML = cartQuantity;
  }
  updateCartQuantity();
  //making search bar and button interactive
  document.querySelector('.js-search-button')
      .addEventListener('click', () => {
        const search = document.querySelector('.js-search-bar').value;
        window.location.href = `amazon.html?search=${search}`;
      });

  //this object lets us save multiple timeout ids for different products
  const addedMessageTimeouts = {};
  // making add to cart button interactive using DOM
  document.querySelectorAll(`.js-add-to-cart`)
  .forEach((button)=>{
      button.addEventListener('click', ()=>{
        const productId = button.dataset.productId;             //saves id of product on clicking button in the variable
        const quantity = Number(document.querySelector(`.js-quantity-${productId}`).value);    //getting value of quantity selector
        const addedMessage = document.querySelector(`.js-added-${productId}`);

        addToCart(productId, quantity);   

        //making cart quantity icon interactive
        updateCartQuantity();

        //added messsage
        addedMessage.classList.add('added-to-cart-visible');
        setTimeout(() => {
          // Check if there's a previous timeout for this product. If there is, we should stop it.
          const previousTimeoutId = addedMessageTimeouts[productId];
          if (previousTimeoutId) {
            clearTimeout(previousTimeoutId);
          }
    
          const timeoutId = setTimeout(() => {
            addedMessage.classList.remove('added-to-cart-visible');
          }, 2000);
    
          // Save the timeoutId for this product so we can stop it later if we need to.
          addedMessageTimeouts[productId] = timeoutId;
        });
      });
  });
}

renderProductsGrid();



