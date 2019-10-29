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

console.log(paluto);

const radio_img =  document.querySelectorAll('.radio-image');
const radio_list = document.querySelectorAll('.radio-list');

init_radio_img_list();

const btnNext = document.querySelector('#next');

btnNext.addEventListener('click', e => {
	e.preventDefault();

	let value = document.querySelector('input[name=acc-resto]:checked').value;

	let ordersObj = Object.create(null);
	ordersObj.style = style;
	ordersObj.item = item;
	ordersObj.img = img;
	ordersObj.subitem = subitem;
	ordersObj.prod_details = prod_details;
	ordersObj.unit_price = unit_price;
	ordersObj.weight = weight;
	ordersObj.market_price = market_price;
	ordersObj.restaurant = value;
	ordersObj.paluto = paluto;
	ordersObj.paluto_price = '';

	let str = JSON.stringify(ordersObj);

	let orders_url = encodeURI(str);

	window.location.href = `order_summary.html?orders=${orders_url}`;
});

//const reso =document.querySelector('#restaurant-choice').offsetWidth;
//document.querySelector('#debug').textContent = `test width ${reso}`;