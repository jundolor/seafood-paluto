const orders_URL = !(objUrlParams.orders === null)? objUrlParams.orders : '';
const orders = decodeURI(orders_URL);
const objOrders = JSON.parse(orders);

const style = objOrders.style;
const item = objOrders.item;
const img = objOrders.img;
const subitem = objOrders.subitem;
const prod_details = objOrders.prod_details;
const unit_price = objOrders.unit_price;
const weight = objOrders.weight;
const market_price = objOrders.market_price;
const restaurant = objOrders.restaurant;
const paluto = objOrders.paluto;
const paluto_price = objOrders.paluto_price;

document.querySelector('#order_title').textContent = `Summary for ${item}`;
const ul_info = document.querySelector('#prod_info');

const btnNext = document.querySelector('#next');

const order_img = document.querySelector('#order-img');

order_img.src = img;

if(style == 'paluto' && restaurant != ''){
	const ul_mode = document.querySelector('#flex-form-next section ul');

	ul_mode.innerHTML = '';
	let li1 = document.createElement('li');
	let li2 = document.createElement('li');

	let radioInput1 = document.createElement('input');
	radioInput1.setAttribute('type', 'radio');
	radioInput1.setAttribute('name', 'mode');
	radioInput1.setAttribute('value', 'Dine In');
	radioInput1.checked = true;

	let radioInput2 = document.createElement('input');
	radioInput2.setAttribute('type', 'radio');
	radioInput2.setAttribute('name', 'mode');
	radioInput2.setAttribute('value', 'Delivery');

	let txt1 = document.createTextNode('Dine In');
	let txt2 = document.createTextNode('Delivery');

	li1.appendChild(radioInput1);
	li1.appendChild(txt1);

	li2.appendChild(radioInput2);
	li2.appendChild(txt2);

	ul_mode.appendChild(li1);
	ul_mode.appendChild(li2);

	const h3_next = document.querySelector('#choose-next h3');
	h3_next.textContent = 'Dine In or Delivery'
}

const cart_key = 'cart';

const addLi = (value, label) => {
	if (value != ''){
		let li = document.createElement('li');
		let txt = document.createTextNode(label);
		li.appendChild(txt);
		ul_info.appendChild(li);
	}
}

const addLiTable = () => {
	let table = document.createElement('table');
	table.id = 'dish-orders';
	table.classList.add('standard-table');

	table.innerHTML = '<tr><td>&nbsp;</td><td>Dish</td><td>Kg</td><td>Special Instruction</td><td>Market Price</td><td>Paluto price</td></tr>';

	let paluto_arr = JSON.parse(paluto);

	paluto_arr.forEach(p => {
		let dsh_img = p.imgSrc;
		let dsh_name = p.dsh_name;
		let dsh_kg = p.dsh_kg;
		let dsh_si = p.si;
		let mkt_prize = p.mkt_prize
		let dsh_prize = p.dsh_prize;

		let tr = document.createElement('tr');

		let td1 = document.createElement('td');
		let td2 = document.createElement('td');
		let td3 = document.createElement('td');
		let td4 = document.createElement('td');
		let td5 = document.createElement('td');
		let td6 = document.createElement('td');

		let img = document.createElement('img');
		img.src = dsh_img
		img.style.width = '50px';
		img.style.height = 'auto';

		dsh_prize = dsh_prize != '' ? `Php ${dsh_prize}` : '';

		td1.appendChild(img);
		td2.textContent = dsh_name;
		td3.textContent = `${dsh_kg} Kg`;
		td4.textContent = `${dsh_si}`;
		td5.textContent = `Php ${mkt_prize}`;
		td6.textContent = dsh_prize;

		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tr.appendChild(td4);
		tr.appendChild(td5);
		tr.appendChild(td6);

		table.appendChild(tr);
	});

	let li = document.createElement('li');
	let div = document.createElement('div');
	div.style.overflowX = 'auto';

	div.appendChild(table);
	li.appendChild(div);
	ul_info.appendChild(li);
}

addLi(`${subitem}`, `${subitem}`);
if(style == 'palengke'){
	addLi(`${prod_details}`, `${prod_details}`);
	addLi(`${weight}`, `Weight: ${weight} kg`);
	addLi(`${market_price}`,`Price: ${market_price}`);
}
else if(style == 'paluto' && restaurant != ''){
	addLiTable()
}


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
		objectCart.createIndex('paluto_details', 'paluto_price', {unique:false});


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

	function addDataPalutoRestaurant(){
		let mode = document.querySelector('input[name="mode"]:checked').value;

		let details = Object.create(null);
		details.name = document.querySelector('#name').value;
		details.contact = document.querySelector('#contact').value;
		details.date = document.querySelector('#date').value;
		details.time = document.querySelector('#time').value;

		let paluto_arr = JSON.parse(paluto);

		paluto_arr.forEach(p => {
			let newOrder = Object.create(null);
			newOrder.style = style;
			newOrder.item = item;
			newOrder.subitem = subitem;
			newOrder.prod_details = prod_details;
			newOrder.weight = weight;
			newOrder.market_price = market_price;
			newOrder.restaurant = restaurant;
			newOrder.paluto = JSON.stringify(p);
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
		});
	}

	btnNext.addEventListener('click', e => {
		e.preventDefault();
		if(style == 'palengke')	addData();
		else if(style == 'paluto' && restaurant != '') addDataPalutoRestaurant()
	});
}

