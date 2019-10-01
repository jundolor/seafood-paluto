const orders_URL = !(objUrlParams.orders === null)? objUrlParams.orders : '';
const orders = decodeURI(orders_URL);
const objOrders = JSON.parse(orders);

const main = objOrders.main;
const prod_type = objOrders.prod_type;
const prod_details = objOrders.prod_details;
const weight = objOrders.weight;
const price = objOrders.price;

document.querySelector('#order_title').textContent = `Summary for ${main}`;
const ul_info = document.querySelector('#prod_info');

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