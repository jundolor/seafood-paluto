const orders_URL = !(objUrlParams.orders === null)? objUrlParams.orders : '';
const orders = decodeURI(orders_URL);
const objOrders = JSON.parse(orders);

const style = objOrders.style;
const item = objOrders.item;
const subitem = objOrders.subitem;
const prod_details = objOrders.prod_details;
const weight = objOrders.weight;
const market_price = objOrders.market_price;
const restaurant = objOrders.restaurant;
const paluto = objOrders.paluto;
const paluto_price = objOrders.paluto_price;

document.querySelector('#order_title').textContent = `Summary for ${item}`;
const ul_info = document.querySelector('#prod_info');

const btnNext = document.querySelector('#next');

const cart_key = 'cart';

const addLi = value => {
	if (value != ''){
		let li = document.createElement('li');
		let txt = document.createTextNode(value);
		li.appendChild(txt);
		ul_info.appendChild(li);
	}
}

addLi(`${subitem}`);
addLi(`${prod_details}`);
addLi(`Weight: ${weight} kg`);
addLi(`Price: ${market_price}`);

const initCart = (name, contact, date, time) => {
	//USE INDEXEDdv

    window.location.href = `cart.html`;
}
//set up indexedDB
let db;

window.onload = () => {
	let request = window.indexedDB.open('cart', 1);

	request.onerror = function(){
		console.log('Database failed to open');
	}

	request.onsuccess = function(){
		console.log("Datbase opened successfully");

		db = request.result;
	}

	request.onupgradeneeded = function(e){
		let db = e.target.result;

		let objectCart = db.createObjectStore('cart', { keyPath: 'id', autoIncrement: true});
		//let objectCart = db.createObjectStore('cart', { keyPath: 'id', autoIncrement: true});

		objectCart.createIndex('style', 'style', {unique:false});
		objectCart.createIndex('item', 'item', {unique:false});
		objectCart.createIndex('subitem', 'subitem', {unique:false});
		objectCart.createIndex('prod_details', 'prod_details', {unique:false});
		objectCart.createIndex('weight', 'weight', {unique:false});
		objectCart.createIndex('market_price', 'market_price', {unique:false});
		objectCart.createIndex('restaurant', 'restaurant', {unique:false});
		objectCart.createIndex('paluto', 'paluto', {unique:false});
		objectCart.createIndex('mode', 'mode', {unique:false});
		objectCart.createIndex('details', 'details', {unique:false});
		objectCart.createIndex('paluto_price', 'paluto_price', {unique:false});


		console.log("Database setup is complete");
	}

	function addData(){

		let mode = document.querySelector('input[name="mode"]:checked').value;

		let details = Object.create(null);
		details.name = document.querySelector('#name').value;
		details.contact = document.querySelector('#contact').value;
		details.date = document.querySelector('#date').value;
		details.time = document.querySelector('#time').value;

		let newOrder = Object.create(null);
		newOrder.style = style;
		newOrder.item = item;
		newOrder.subitem = subitem;
		newOrder.prod_details = prod_details;
		newOrder.weight = weight;
		newOrder.market_price = market_price;
		newOrder.restaurant = restaurant;
		newOrder.paluto = paluto;
		newOrder.mode = mode;
		newOrder.details = details;
		newOrder.paluto_price = paluto_price;

		let transaction = db.transaction(['cart'], 'readwrite');
		let objectCart = transaction.objectStore('cart');
		let request = objectCart.add(newOrder);

		request.onsuccess = () => {
			console.log("Added");
		}

		transaction.oncomplete = () => {
			console.log('transaction completed');

			window.location.href = 'cart.html';
		}

		transaction.onerror = () => {
			console.log('transaction not completed, error!!!');
		}
	}

	btnNext.addEventListener('click', e => {
		e.preventDefault();
		addData();
	});
}

