const orders_URL = !(objUrlParams.orders === null)? objUrlParams.orders : '';
const orders = decodeURI(orders_URL);
console.log(orders);
const order_summary = document.querySelector('#order_summary');
const objOrders = JSON.parse(orders);
const b1 = document.querySelector('#b1');
const b2 = document.querySelector('#b2');

let th = document.createElement('tr');

let th_td1 = document.createElement('td');
th_td1.textContent = 'Item';

let th_td2 = document.createElement('td');
th_td2.textContent = 'Description';

let th_td3 = document.createElement('td');
th_td3.textContent = 'Qty';

let th_td4 = document.createElement('td');
th_td4.textContent = 'Price';

th.appendChild(th_td1);
th.appendChild(th_td2);
th.appendChild(th_td3);
th.appendChild(th_td4);

let ctr = 0;
let total =  0;

order_summary.appendChild(th);

objOrders.forEach(el => {
	let dish = el.dish;
	let price = el.price;

	ctr += 1;

	let tr = document.createElement('tr');

	let td1 = document.createElement('td');
	let td2 = document.createElement('td');
	let td3 = document.createElement('td');
	let td4 = document.createElement('td');

	td1.textContent = `${ctr}`;
	td2.textContent = `${dish}`;
	td3.textContent = `1 Kg`;
	td4.textContent = `${price}`;

	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);
	tr.appendChild(td4);

	order_summary.appendChild(tr);

	total += parseFloat(price);
});

let tr = document.createElement('tr');

let td1 = document.createElement('td');
let td2 = document.createElement('td');
let td3 = document.createElement('td');
let td4 = document.createElement('td');

td1.textContent = ` `;
td2.textContent = ` `;
td3.textContent = ``;
td4.textContent = `${total}`;

tr.appendChild(td1);
tr.appendChild(td2);
tr.appendChild(td3);
tr.appendChild(td4);

order_summary.appendChild(tr);

const button_filler = e => {e.preventDefault();}

b1.addEventListener('click', button_filler);
b2.addEventListener('click', button_filler);