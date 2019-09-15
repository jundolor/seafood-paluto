const product = !(objUrlParams.product === null)? objUrlParams.product : '';
const size  = !(objUrlParams.size === null)? objUrlParams.size : '';
const price = !(objUrlParams.price === null)? objUrlParams.price : '';
const kilo = !(objUrlParams.kilo === null)? objUrlParams.kilo : '';
const radio_img =  document.querySelectorAll('.radio-image');
const selected_dishes =[];

let dish_filler = 0;

const prod_img = document.querySelector('#prod-img');
const wt_title = document.querySelector('#wt-title');
const peso_price = document.querySelector('#peso-price');

prod_img.src = `images/palengke/${product}-${size}.png`;

const productCap = product.charAt(0).toUpperCase() + product.slice(1);
const sizeCap = size.charAt(0).toUpperCase() + size.slice(1);
const computed_price = parseFloat(price) * parseFloat(kilo);

wt_title.textContent = `${productCap}, ${sizeCap}: ${kilo} Kg`;
peso_price.textContent = `Php ${computed_price}`;

const next_page = document.querySelector("#next-page");

radio_img.forEach(el => {
	el.addEventListener('click', () => {
		let value =  el.value;
		let dish_selected = el.dataset.dish;

		console.log('id', el.id);
		
		let arr = value.split(':');
		document.querySelector('#selected-dish').textContent = `Selected Dish: ${arr[0]}/ Price: Php ${arr[1]}`;

		if(dish_filler < 5){
			dish_filler += 1;
			let img_to_get = document.querySelector(`img[alt="${arr[0]}"]`);

			let img_to_replace = document.querySelector(`#dish-fill-${dish_filler}`);
			img_to_replace.src = img_to_get.src;

			let obj = {dish: `${dish_selected}`, price: `${arr[1]}`, dish_id: `${el.id}`, dish_value: `${value}`};
			selected_dishes.push(obj);
		}

		document.querySelector('#wt-title').scrollIntoView({ 
		  behavior: 'smooth' 
		});
	});
});

next_page.addEventListener('click', e => {
	e.preventDefault();
	let length = selected_dishes.length;
	/*
	let dish_selected = document.querySelector('input[name=dish]:checked');
	let dish_id = dish_selected.id;
	let dish = dish_selected.value;
	*/
	if(length == 1){
		//
		let dish_id = selected_dishes[0].dish_id;
		let dish = selected_dishes[0].dish_value;
		//dish =JSON.stringify(dish);
		window.location.href = `weight_dish_summary.html?product=${product}&size=${size}&price=${price}&kilo=${kilo}&dish_id=${dish_id}&dish=${dish}&paluto_price=${computed_price}`;
	}
	else{
		let orders = JSON.stringify(selected_dishes);
		//console.log(orders);

		let orders_url = encodeURI(orders);
		//console.log(orders_url);

		window.location.href = `delivery_summary.html?orders=${orders_url}`;
	}

	//window.location.href = `weight_dish_summary.html?product=${product}&size=${size}&price=${price}&kilo=${kilo}&dish_id=${dish_id}&dish=${dish}&paluto_price=${computed_price}`;
});