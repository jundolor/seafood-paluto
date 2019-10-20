const orders_URL = !(objUrlParams.orders === null)? objUrlParams.orders : '';
const orders = decodeURI(orders_URL);
const objOrders = JSON.parse(orders);

const style = objOrders.style;
const item = objOrders.item;
const img = objOrders.img;
const subitem = objOrders.subitem;
const prod_details = objOrders.prod_details;
const weight = objOrders.weight;
const unit_price = objOrders.unit_price;
const market_price = objOrders.market_price;
const restaurant = objOrders.restaurant;
let paluto = objOrders.paluto;
let paluto_price = objOrders.paluto_price;

console.log(paluto)

const radio_img =  document.querySelectorAll('.radio-image');
const radio_list = document.querySelectorAll('.radio-list');

init_radio_img_list();