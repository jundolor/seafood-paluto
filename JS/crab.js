const style = !(objUrlParams.style === null)? objUrlParams.style : 'palengke';
const slideList = document.querySelector('ul.hs');
slideList.innerHTML = '';
const crabs = [];
var unit_price = 0;
var price_idx = '11';
var prod_type = '';
var prod_details = '';
const weight_title =document.querySelector('#weight h3');
const flex_form_weight = document.querySelector('#flex-form-weight');
const product_weight = document.querySelector('#product-weight');
var crab_price = 0;
const computed_price = document.querySelector('#computed_price');
var genders;
const flex_form_gender = document.querySelector('#flex-form-gender');
const flex_form_size = document.querySelector('#flex-form-size');
const btnNext = document.querySelector('#next');

(function(){
	fetch('JS/json/crabs.json')
	.then(response => {
		if(!response.ok){
			throw Error(response.statusText);
		}
		return response.json();
	})
	.then(response => {
		updateCrabArr(response);
		console.log(crabs);
		updateSlideList(crabs);
	})
	.catch(error => {
		console.log(error);
	})
})();

product_weight.addEventListener('change', () => {
	console.log(product_weight.value)

	crab_price =  parseFloat(product_weight.value) * parseFloat(unit_price);
	computed_price.textContent	= `Price for ${prod_type}, ${product_weight.value} Kg : ${crab_price}`;
})

const updateCrabArr = data => {
	data.crabs.forEach(ind => {
		let type = ind.type;
		let img = ind.img;
		let size_arr = ind.size;
		let gender_arr = ind.gender;
		let prices_arr = ind.price_maxtrix;

		let crab_obj = Object.create(null);
		crab_obj.type = type;
		crab_obj.img = img;
		crab_obj.size_arr = size_arr;
		crab_obj.gender_arr = gender_arr;
		crab_obj.prices_arr = prices_arr;

		crabs.push(crab_obj);

	});
}

const updateSlideList = crab_Arr => {
	crab_Arr.forEach(crab => {
		let type = crab.type;
		let img = crab.img;

		let li = document.createElement('li');
		li.classList.add('order-main');
		li.dataset.mainOrder = type;

		let imgTag = document.createElement('img');
		imgTag.src = img;
		imgTag.alt = type;

		let h2 = document.createElement('h2');
		h2.textContent = type;

		let p = document.createElement('p');
		p.innerHTML = 'Order Now <i class="fa fa-arrow-circle-right"></i>';

		li.appendChild(imgTag);
		li.appendChild(h2);
		li.appendChild(p);

		li.addEventListener('click', () => {
			//console.log(li.dataset.mainOrder)
			nextStep(type);
		})

		slideList.appendChild(li);
	});
}

const getPrice = (acc, crb) => {
	if(crb.type == prod_type){
		acc = crb.prices_arr.reduce((acc2,cr2) => {
			if(cr2.idx == price_idx) acc2 = cr2.price;
			return acc2
		}, '');
	}
	return acc;
}

const getGenders = (acc, crb) => {
	if(crb.type == prod_type) acc = crb.gender_arr
	return acc;
}

const getSizes = (acc, crb) => {
	if(crb.type == prod_type) acc = crb.size_arr;
	return acc;
}

const initGenders = () => {
	genders = crabs.reduce(getGenders, []);
	let flex_form_gender_ul = flex_form_gender.querySelector('ul');

	genders.forEach((gd,idx) => {
		let li = document.createElement('li');
		let radioInput = document.createElement('input');
		radioInput.setAttribute('type', 'radio');
		radioInput.setAttribute('name', 'gender');
		radioInput.setAttribute('value', idx);
		radioInput.setAttribute('class', 'radio-list');
		radioInput.dataset.genderValue = gd;

		let txt = document.createTextNode(`${gd}`); 

		li.appendChild(radioInput);
		li.appendChild(txt);
		flex_form_gender_ul.appendChild(li);
	});

	if(flex_form_gender.className == 'flex-form form-init'){
		flex_form_gender.className = 'flex-form form-full';
	}

	document.querySelector('#flex-form-gender').scrollIntoView({ 
	  behavior: 'smooth' 
	});
}

const populateSizes = () => {
	let sizes = crabs.reduce(getSizes, []);
	console.log(sizes);
	let flex_form_size_ul = flex_form_size.querySelector('ul');

	sizes.forEach((sz, idx) => {
		let li = document.createElement('li');
		let radioInput = document.createElement('input');
		radioInput.setAttribute('type', 'radio');
		radioInput.setAttribute('name', 'size');
		radioInput.setAttribute('value', idx);
		radioInput.setAttribute('class', 'radio-list-size');
		radioInput.dataset.sizeValue = sz;

		let txt = document.createTextNode(`${sz}`); 

		li.appendChild(radioInput);
		li.appendChild(txt);
		flex_form_size_ul.appendChild(li);
	});
}

const initSizes = () => {
	populateSizes();

	if(flex_form_size.className == 'flex-form form-init'){
		flex_form_size.className = 'flex-form form-full';
	}

	document.querySelector('#flex-form-size').scrollIntoView({ 
	  behavior: 'smooth' 
	});
}

const display_weight = () => {
	weight_title.innerHTML = `Choose weight for ${prod_type}/  Price per Kg: ${unit_price}`;
	//
	if(flex_form_weight.className == 'flex-form form-init'){
		flex_form_weight.className = 'flex-form form-full';
	}

	crab_price =  parseFloat(product_weight.value) * parseFloat(unit_price);
	computed_price.textContent	= `Price for ${prod_type}, ${product_weight.value} Kg : ${crab_price}`;

	document.querySelector('#flex-form-weight').scrollIntoView({ 
	  behavior: 'smooth' 
	});
}

const getGenderOnlyPrice = () => {
	let value = document.querySelector('input[name=gender]:checked').value;
	price_idx = value + "0";
	unit_price =crabs.reduce(getPrice, '--');
	prod_details = document.querySelector('input[name=gender]:checked').dataset.genderValue;
	
	display_weight();
}

const getSizeOnlyPrice = () => {
	let value = document.querySelector('input[name=size]:checked').value;
	price_idx = "0" + value;
	unit_price =crabs.reduce(getPrice, '--');
	prod_details = document.querySelector('input[name=size]:checked').dataset.sizeValue + " Size";
	
	display_weight();
}

const updateGenderSizePriceMatrix = () => {
	if(!(document.querySelector('input[name=gender]:checked') === null) && !(document.querySelector('input[name=size]:checked') === null)){
		let value1 = document.querySelector('input[name=gender]:checked').value;
		let value2 = document.querySelector('input[name=size]:checked').value;

		price_idx = value1 + value2;

		prod_details = document.querySelector('input[name=gender]:checked').dataset.genderValue + " / " + document.querySelector('input[name=size]:checked').dataset.sizeValue + " Size";

		unit_price =crabs.reduce(getPrice, '--');
	}
}

const getGenderPriceMatrix = () => {
	initSizes();
	updateGenderSizePriceMatrix();

	let size_rb = document.querySelectorAll('.radio-list-size');
	size_rb.forEach(sze => {
		sze.addEventListener('click', getSizePriceMatrix);
	});
}

const getSizePriceMatrix = () => {
	updateGenderSizePriceMatrix();

	display_weight();
}

const reset = () => {
	//reset vars
	var unit_price = 0;
    var price_idx = '11';
	var prod_type = '';
	prod_details = '';
	//reset gender
	//clear first the event listeners
	let gender_rb = document.querySelectorAll('.radio-list');
	gender_rb.forEach(grb => {
		grb.removeEventListener('click', getGenderOnlyPrice);
		grb.removeEventListener('click', getGenderPriceMatrix);
	});

	if(flex_form_gender.className == 'flex-form form-full'){
		flex_form_gender.className = 'flex-form form-init';
	}

	if (flex_form_gender.querySelector('ul').hasChildNodes()) flex_form_gender.querySelector('ul').innerHTML = "";

	//reset sizes 
	let size_rb = document.querySelectorAll('.radio-list-size');
	size_rb.forEach(sze => {
		sze.removeEventListener('click', getSizeOnlyPrice);
		sze.removeEventListener('click', getSizePriceMatrix);
	});

	if(flex_form_size.className == 'flex-form form-full'){
		flex_form_size.className = 'flex-form form-init';
	}

	if (flex_form_size.querySelector('ul').hasChildNodes()) flex_form_size.querySelector('ul').innerHTML = "";
 
	//reset weight 
	weight_title.innerHTML = "Choose Weight";
	if(flex_form_weight.className == 'flex-form form-full'){
		flex_form_weight.className = 'flex-form form-init';
	}

	computed_price.textContent	= "";
}

const nextStep = type => {
	reset();
	console.log('next step for ' + type);
	let selected_crab = crabs.reduce((acc, curr) => { 
		if(curr.type == type) {
			acc.type = curr.type;
			acc.size = curr.size_arr;
			acc.gender = curr.gender_arr;
		}
		return acc;
	}, {type: '', size: [], gender: []})
	console.log(selected_crab);

	prod_type = selected_crab.type;
	let gender = selected_crab.gender;
	let size = selected_crab.size;


	if(gender.length == 1 && size.length == 1){
		price_idx = '00';
		unit_price =crabs.reduce(getPrice, '--');
		display_weight();
		
	}
	else if(gender.length > 1 && size.length == 1){
		initGenders();
		
		let gender_rb = document.querySelectorAll('.radio-list');
		gender_rb.forEach(grb => {
			grb.addEventListener('click', getGenderOnlyPrice);
		});
	}
	else if(gender.length == 1 && size.length > 1){
		initSizes();

		let size_rb = document.querySelectorAll('.radio-list-size');
		size_rb.forEach(sze => {
			sze.addEventListener('click', getSizeOnlyPrice)
		});
	}
	else if(gender.length > 1 && size.length > 1){
		initGenders();
		let gender_rb = document.querySelectorAll('.radio-list');
		gender_rb.forEach(grb => {
			grb.addEventListener('click', getGenderPriceMatrix); //calls initSizes
		});
	}

}

btnNext.addEventListener('click', e => {
	e.preventDefault();

	prod_details = prod_details != '' ? prod_details : '22';

	let ordersObj = {prod_type: prod_type, prod_details: prod_details, weight: product_weight.value, price: crab_price};

	let str = JSON.stringify(ordersObj);

	let orders_url = encodeURI(str);

	window.location.href = `order_summary.html?orders=${orders_url}`;
});