const product = !(objUrlParams.product === null)? objUrlParams.product : '';
const size  = !(objUrlParams.size === null)? objUrlParams.size : '';
const price = !(objUrlParams.price === null)? objUrlParams.price : '';
const kilo = !(objUrlParams.kilo === null)? objUrlParams.kilo : '';
const dish_id = !(objUrlParams.dish_id === null)? objUrlParams.dish_id : '';
const dish = !(objUrlParams.dish === null)? objUrlParams.dish : 'y:y';
const paluto_price = !(objUrlParams.paluto_price === null)? objUrlParams.paluto_price : '';
const next_page = document.querySelector('#next-page');

const radio_img =  document.querySelectorAll('.radio-image');
const radio_list = document.querySelectorAll('.radio-list');

document.querySelector('#total-kg').textContent = `Total: ${kilo} Kg`;
document.querySelector('#img1').src = `images/paluto/${dish_id}.png`;

let dish_arr = dish.split(':');
let dish_selected = dish_arr[0].replace('%20', ' ');
let dish_price = dish_arr[1];

document.querySelector('#dish-charge').value = `${dish_price}`;
document.querySelector('#paluto-charge').value = `${paluto_price}`;

init_radio_img_list();

next_page.addEventListener('click', e => {
	e.preventDefault();

	let str = '';

	let resto = document.querySelector('input[name=acc-resto]:checked');
	str += `resto=${resto.value}`;
	let resto_no = resto.dataset.gid;
	str += `&resto_no=${resto_no}`;

	for(let [key, value] of Object.entries(objUrlParams)){
		str += `&${key}=${value}`;
	}

	window.location.href = `order_payment_first.html?${str}`;
});