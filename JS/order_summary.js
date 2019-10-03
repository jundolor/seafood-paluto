const orders_URL = !(objUrlParams.orders === null)? objUrlParams.orders : '';
const orders = decodeURI(orders_URL);
const objOrders = JSON.parse(orders);

const style = objOrders.style;
const main = objOrders.main;
const prod_type = objOrders.prod_type;
const prod_details = objOrders.prod_details;
const weight = objOrders.weight;
const price = objOrders.price;

document.querySelector('#order_title').textContent = `Summary for ${main}`;
const ul_info = document.querySelector('#prod_info');

const btnNext = document.querySelector('#next');

const cart_key = 'cart';

let li1 = document.createElement('li');
let li2 = document.createElement('li');
let li3 = document.createElement('li');
let li4 = document.createElement('li');

let txt1 = document.createTextNode(`${prod_type}`);
let txt2 = document.createTextNode(`${prod_details}`);
let txt3 = document.createTextNode(`Weight: ${weight} kg`);
let txt4 = document.createTextNode(`Price: ${price}`);

li1.appendChild(txt1);
li2.appendChild(txt2);
li3.appendChild(txt3);
li4.appendChild(txt4);

ul_info.appendChild(li1);
ul_info.appendChild(li2);
ul_info.appendChild(li3);
ul_info.appendChild(li4);

const initCart = (name, contact, date, time) => {
	let objCart = Object.create(null);
	objCart.id = 1;
	objCart.style = style;
	objCart.prod_type = prod_type;
	objCart.paluto = '';//this will be populated later
	objCart.mode = document.querySelector('input[name=mode]:checked').value;
	objCart.details = {name:name, contact:contact, date:date, time:time};
	objCart.kg = weight;
	objCart.price = price;

	let arr = [];
	arr.push(objCart);

	let val = JSON.stringify(arr);

	localforage.setItem(cart_key, val).then(function (val) {
        console.log("setItem stored: ", val);
    });

    window.location.href = `cart.html`;
}

btnNext.addEventListener('click', e => {
	e.preventDefault();

	let name = document.querySelector('#name').value;
	let contact = document.querySelector('#contact').value;
	let date = document.querySelector('#date').value;
	let time = document.querySelector('#time').value;

	console.log("LocalForage is: ", localforage);

	localforage.getItem(cart_key).then(function (val) {
        console.log("getItem returned: ", val);
        if(val == null){
        	initCart(name, contact, date, time);
        }
        else{
        	initCart(name, contact, date, time);//temp
        }
    }).catch(function () {
        console.log("Error retrieving item");
    })
});