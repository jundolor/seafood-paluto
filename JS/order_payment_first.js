const product = !(objUrlParams.product === null)? objUrlParams.product : '';
const size  = !(objUrlParams.size === null)? objUrlParams.size : '';
const price = !(objUrlParams.price === null)? objUrlParams.price : '';
const kilo = !(objUrlParams.kilo === null)? objUrlParams.kilo : '';
const dish_id = !(objUrlParams.dish_id === null)? objUrlParams.dish_id : '';
const dish = !(objUrlParams.dish === null)? objUrlParams.dish : 'y:y';
const paluto_price = !(objUrlParams.paluto_price === null)? objUrlParams.paluto_price : '';
const resto_name = !(objUrlParams.product === null)? objUrlParams.resto.replace('%20', ' ') : '';
const resto_no = !(objUrlParams.resto_no === null)? objUrlParams.resto_no : '';
const order_summary = document.querySelector('#order_summary');
const next_page = document.querySelector('#next-page');

const order_pay = document.querySelector('#order_pay');
const order_next = document.querySelector('#order_next');

console.log(resto_name);
console.log(resto_no);

let imgpath1 = `images/restaurant/resto${resto_no}.png`
let imgpath2 = `images/paluto/${dish_id}.png`

document.querySelector('#img1').src = imgpath1;
document.querySelector('#img2').src = imgpath2;

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

let tr1 = document.createElement('tr')

let tr1_d1 = document.createElement('td');
let tr1_d2 = document.createElement('td');
let tr1_d3 = document.createElement('td');
let tr1_d4 = document.createElement('td');

const productCap = product.charAt(0).toUpperCase() + product.slice(1);
const sizeCap = size.charAt(0).toUpperCase() + size.slice(1);

let dish_arr = dish.split(':');
let dish_selected = dish_arr[0].replace('%20', ' ');
let dish_price = dish_arr[1];

tr1_d1.textContent = '1';
tr1_d2.textContent = `${productCap}, ${sizeCap}`;
tr1_d3.textContent = `${kilo} Kg`;
tr1_d4.textContent = `Php ${dish_price}`;

tr1.appendChild(tr1_d1);
tr1.appendChild(tr1_d2);
tr1.appendChild(tr1_d3);
tr1.appendChild(tr1_d4);

let tr2 = document.createElement('tr');

let tr2_d1 = document.createElement('td');
let tr2_d2 = document.createElement('td');
let tr2_d3 = document.createElement('td');
let tr2_d4 = document.createElement('td');

tr2_d1.textContent = '2';
tr2_d2.textContent = 'Paluto';
tr2_d3.textContent = '';
tr2_d4.textContent = `Php ${paluto_price}`;

tr2.appendChild(tr2_d1);
tr2.appendChild(tr2_d2);
tr2.appendChild(tr2_d3);
tr2.appendChild(tr2_d4);

let tr3 = document.createElement('tr');

let tr3_d1 = document.createElement('td');
let tr3_d2 = document.createElement('td');
let tr3_d3 = document.createElement('td');
let tr3_d4 = document.createElement('td');

const order_total = parseFloat(dish_price) + parseFloat(paluto_price);

tr3_d1.textContent = '';
tr3_d2.textContent = '';
tr3_d3.textContent = '';
tr3_d4.textContent = `Php ${order_total}`

tr3.appendChild(tr3_d1);
tr3.appendChild(tr3_d2);
tr3.appendChild(tr3_d3);
tr3.appendChild(tr3_d4);


order_summary.appendChild(th);
order_summary.appendChild(tr1);
order_summary.appendChild(tr2);
order_summary.appendChild(tr3);

next_page.addEventListener('click', e => {
	e.preventDefault();

	order_pay.style.display = 'none';
	order_next.style.display = 'block';
});