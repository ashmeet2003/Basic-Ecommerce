import {cart, removeFromCart, updateDeliveryOption} from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';  //default export
import { deliveryOptions } from '../data/deliveryOptions.js';

let cartSummaryHTML = ``;     //to combine all the HTML and display on web page

cart.forEach((cartItem) => {

  const productId = cartItem.productId;
  //finding other details from productId
  let matchingProduct;    //to find and save details from products

  products.forEach((product) => {
    if(product.id === productId){
      matchingProduct = product;
    }
  });

  //knowing which delivery option is selected
  const deliveryOptionId = cartItem.deliveryOptionId;
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if(option.id === deliveryOptionId ){
      deliveryOption = option;
    }
  });

  const today = dayjs();
  const deliveryDate = today.add( deliveryOption.deliveryDays, 'days' );
  const dateString = deliveryDate.format('dddd, MMMM D');

  cartSummaryHTML += `
   <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
          ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProduct, cartItem)}
          
        </div>
      </div>
    </div>
  `;
});

//function to generate HTML for delivery options
function deliveryOptionsHTML(matchingProduct, cartItem){
  //variable to combine all HTML
  let html = '';

  deliveryOptions.forEach((deliveryOption) => {
    //getting delivery date
    const today = dayjs();
    const deliveryDate = today.add( deliveryOption.deliveryDays, 'days' );
    const dateString = deliveryDate.format('dddd, MMMM D');

    //delivery price
    const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;

    //to find which is checked acc. to deliveryOptionId
    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html += `
      <div class="delivery-option js-delivery-option" 
      data-product-id="${matchingProduct.id}"
      data-delivery-option-id="${deliveryOption.id}">
        <input type="radio"
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
    `
  });

  return html;
}

//putting the combined HTML on webpage
document.querySelector(`.js-order-summary`)
  .innerHTML = cartSummaryHTML;

// making all delete links interactive
document.querySelectorAll(`.js-delete-link`)
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      // making new cart excluding this product
      removeFromCart(productId);
      
      //removing HTML from webpage, first getting element
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      //using remove method
      container.remove();
    });
  });

//adding event listeners to delivery option 
document.querySelectorAll('.js-delivery-option')
  .forEach((element) => {
    element.addEventListener('click', () => {
      const {productId, deliveryOptionId} = element.dataset;   //taking aut these from data attribute
      updateDeliveryOption(productId, deliveryOptionId);      //we use(added) data attributes to get these parameter
    });
  });