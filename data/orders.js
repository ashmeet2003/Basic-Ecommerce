export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrders(order){
  orders.unshift(order);    //saves order in the front
  saveToStorage();
}

function saveToStorage(){
  localStorage.setItem('orders', JSON.stringify(orders));
}