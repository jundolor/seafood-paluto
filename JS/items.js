const style = !(objUrlParams.style === null)? objUrlParams.style : 'palengke';
const item = !(objUrlParams.item === null)? objUrlParams.item : 'shrimps';
const url = `JS/json/${item}.json`;
let json_key;
const subitems = [];
//const radio_img =  document.querySelectorAll('.radio-image');
const item_details = document.querySelector('#items-details');
const product_size = document.querySelector('#product-size');
const product_weight = document.querySelector('#product-weight');
const item_price = document.querySelector('#item-price');

const cards = document.querySelector('#cards');
const btnNext = document.querySelector('#next');

(function(){
	fetch(url)
	.then(response => {
		if(!response.ok){
			throw Error(response.statusText);
		}
		return response.json();
	})
	.then(response => {
		json_key = Object.keys(response)[0];
		console.log(json_key);
		updateSubitem(response); //populates subitems
		displaySubitems();
		
	})
	.catch(error => {
		console.log(error);
	})
})();

const updateSubitem = data => {
	data[json_key].forEach(subItm => {
		let subtype = subItm.subtype;
		let img = subItm.img;
		let size_arr = subItm.sizes;
		let price_arr = subItm.prices;

		let objItem = Object.create(null);
		objItem.subtype = subtype;
		objItem.img = img;
		objItem.size_arr = size_arr;
		objItem.price_arr = price_arr;

		subitems.push(objItem);
	});
}

const displaySubitems = () => {
	subitems.forEach((el, idx) => {
		let itemNo = `item${idx}`;
		let article = document.createElement('article');
		article.classList.add('card-2col');

		let price_list = el.price_arr.join(':');
		let size_list = el.size_arr.join(':');

		let radioInput = document.createElement('input');
		radioInput.setAttribute('type', 'radio');
		radioInput.setAttribute('name', item);
		radioInput.setAttribute('value', el.subtype);
		radioInput.setAttribute('id', itemNo);
		radioInput.classList.add('radio-image');
		radioInput.dataset.priceList = price_list;
		radioInput.dataset.sizeList = size_list;

		radioInput.addEventListener('change', nextStep);

		let label = document.createElement('label');
		//label.for = itemNo;
		label.setAttribute('for', itemNo);
		label.style.textAlign = 'center';

		let img = document.createElement('img');
		img.src = el.img;
		let div1 = document.createElement('div');
		div1.textContent = el.subtype;

		let price_range = `Php ${el.price_arr[0]}`;
		if(el.price_arr.length > 1){
			let offset = el.price_arr.length - 1;
			price_range += ` - ${el.price_arr[offset]}`;
		}

		let div2 = document.createElement('div');
		div2.textContent = price_range;

		label.appendChild(img);
		label.appendChild(div1);
		label.appendChild(div2);

		article.appendChild(radioInput);
		article.appendChild(label);

		cards.appendChild(article);
	});
}

const nextStep = (e) => {
	console.log(e.target.value)
	console.log(e.target.dataset.sizeList);
	console.log(e.target.dataset.priceList);

	let item_prod = e.target.value;
	let size_arr = e.target.dataset.sizeList.split(':');
	let price_arr = e.target.dataset.priceList.split(':');

	product_size.innerHTML = '';

	for(i=0; i < size_arr.length; i++){
		let opt = document.createElement('option');
		opt.value = `${size_arr[i]}:${price_arr[i]}`;
		let txt = document.createTextNode(`${size_arr[i]} / Php ${price_arr[i]}`);
		opt.appendChild(txt);

		product_size.appendChild(opt);

		if(item_details.className == 'flex-form form-init'){
			item_details.className = 'flex-form form-full';
		}

		document.querySelector('#selected h3').textContent = `Choose your ${item_prod} size and weight`;

		compute_price();

		document.querySelector('#selected').scrollIntoView({ 
		  behavior: 'smooth' 
		});
	}
}

const compute_price = () => {
	let selected_size_arr = product_size.value.split(':');
	let size = selected_size_arr[0];
	let prize = parseFloat(selected_size_arr[1]);
	let selected_weight = parseFloat(product_weight.value);
	let subitem_prod = document.querySelector(`input[name="${item}"]:checked`).value;

	let total_prize = prize * selected_weight;


	item_price.textContent = `Total for ${subitem_prod}, ${selected_weight} kg: ${total_prize}`;
}

product_size.addEventListener('change', compute_price);
product_weight.addEventListener('change', compute_price);

const reset = () => {
	let subitem_arr = document.querySelectorAll(`input[name="${item}"]`);

	subitem_arr.forEach(st => {
		st.checked = false;
	});

	document.querySelector('#selected h3').textContent = "";

	product_size.innerHTML = '';

	product_weight.selectedIndex = "0";

	item_price.textContent = '';

	item_details.className = 'flex-form form-init';
}

const order_summary_palengke = () => {
	let subitem_prod = document.querySelector(`input[name="${item}"]:checked`).value;
	let img = document.querySelector(`input[name="${item}"]:checked`).nextSibling.firstChild.src;

	let selected_size_arr = product_size.value.split(':');
	let size = selected_size_arr[0];
	let prize = parseFloat(selected_size_arr[1]);

	let prod_details = `${size} Size / Php ${prize}`;

	let total_prize = prize * parseFloat(product_weight.value);

	let ordersObj = Object.create(null);
	ordersObj.style = style;
	ordersObj.item = json_key;
	ordersObj.img = img;
	ordersObj.subitem = subitem_prod;
	ordersObj.prod_details = prod_details;
	ordersObj.weight = product_weight.value;
	ordersObj.market_price = total_prize;
	ordersObj.restaurant = '';
	ordersObj.paluto = '';
	ordersObj.paluto_price = '';

	let str = JSON.stringify(ordersObj);

	let orders_url = encodeURI(str);

	reset();

	window.location.href = `order_summary.html?orders=${orders_url}`;
}

btnNext.addEventListener('click', e => {
	e.preventDefault();

	order_summary_palengke();
});