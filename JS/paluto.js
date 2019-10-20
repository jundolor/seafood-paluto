const orders_URL = !(objUrlParams.orders === null)? objUrlParams.orders : '';
const orders = decodeURI(orders_URL);
const objOrders = JSON.parse(orders);

const style = objOrders.style;
const item = objOrders.item;
const img = objOrders.img;
const subitem = objOrders.subitem;
const prod_details = objOrders.prod_details;
const weight = objOrders.weight;
const unit_price = objOrders.unit_price;
const market_price = objOrders.market_price;
const restaurant = objOrders.restaurant;
let paluto = ''; //objOrders.paluto;
let paluto_arr = [];
let paluto_price = objOrders.paluto_price;

const add_dish = document.querySelector('#add-dish');
const dlg = document.querySelector('#dialog-select-dish');

const url = `JS/json/dishes.json`;
const dishes = [];
const cards = document.querySelector('#cards');

let itmImg = document.createElement('img');
itmImg.src = img;

let weight_limit = parseFloat(weight);

const selected_dish = document.querySelector('#selected-dish');
const selected_dish_price = document.querySelector('#selected-dish-price');
const select_kg = document.querySelector('#selected-kg');
const tbl_dish_order = document.querySelector('#dish-orders');

const computed_paluto_disp = document.querySelector('#computed-paluto');
let computed_paluto =0;

//populate the item info
const txt1 = document.createTextNode(`${subitem} @ Php ${unit_price}`);
const txt2 = document.createTextNode(`Ordered: ${weight} Kg`);
const txt3 = document.createTextNode('Total Palengke');


document.querySelector('#itmImg').appendChild(itmImg);
document.querySelector('#itmName').appendChild(txt1);
document.querySelector('#itmKg').appendChild(txt2);
document.querySelector('#itmTotal').appendChild(txt3);

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

window.addEventListener("load", () => {
	add_dish.addEventListener('click', () => {
		reset_dialog();

		dlg.showModal();

		document.querySelector('#dialog-select-dish').scrollIntoView({ 
		  behavior: 'smooth' 
		});
	});

	// add event listeners for the OK and Cancel buttons
    document.getElementById("okBtn").addEventListener("click", function () {
        //dlg = document.getElementById("dialog1");
        // Check to see if the dialog is in fact open, if so then close it with "OK"
        if (dlg.open) {
            dlg.close("OK");

            add_dish_order();
            update_weight_limit();
            check_dialog_button();
            compute_total_paluto();
        }
    })
    document.getElementById("cancelBtn").addEventListener("click", function () {
        //dlg = document.getElementById("dialog1");
        // Check to see if the dialog is in fact open, if so then close it with "Cancel"
        if (dlg.open) {
            dlg.close("Cancel");
        }
    })

    // event listeners for the dialog itself - close and cancel
    //dlg = document.getElementById("dialog1");
    dlg.addEventListener("close", function (evt) {
        console.log("Dialog closed: ", dlg.returnValue)
    });
    dlg.addEventListener("cancel", function (evt) {
        console.log("Dialog canceled: ", dlg.returnValue)
    });
})



const updateSubitem = data => {
	data[json_key].forEach(dish => {
		let dshId = dish.id;
		let dshName = dish.name;
		let dshImg = dish.img;
		let dshPrice = dish.price;

		let objItem = Object.create(null);
		objItem.id = dshId;
		objItem.name = dshName;
		objItem.img = dshImg;
		objItem.price = dshPrice;

		dishes.push(objItem);
	});
}

const displaySubitems = () => {
	dishes.forEach(el => {
		let article = document.createElement('article');
		article.classList.add('card-2col');

		let radioInput = document.createElement('input');
		radioInput.setAttribute('type', 'radio');
		radioInput.setAttribute('name', 'dish');
		radioInput.setAttribute('value', el.name);
		radioInput.setAttribute('id', el.id);
		radioInput.classList.add('radio-image');
		radioInput.dataset.price = el.price;

		radioInput.addEventListener('change', nextStep);

		let label = document.createElement('label');
		label.setAttribute('for', el.id);
		label.style.textAlign = 'center';

		let img = document.createElement('img');
		img.src = el.img;
		let div1 = document.createElement('div');
		div1.textContent = el.name;

		let div2 = document.createElement('div');
		div2.textContent = el.price;

		label.appendChild(img);
		label.appendChild(div1);
		label.appendChild(div2);

		article.appendChild(radioInput);
		article.appendChild(label);

		cards.appendChild(article);
	})
}

const insertTableDishOrder = objDish => {
	let dsh_img = objDish.imgSrc;
	let dsh_name = objDish.dsh_name;
	let dsh_kg = objDish.dsh_kg;
	let dsh_si = objDish.si;
	let dsh_prize = objDish.dsh_prize;

	let tr = document.createElement('tr');

	let td1 = document.createElement('td');
	let td2 = document.createElement('td');
	let td3 = document.createElement('td');
	let td4 = document.createElement('td');
	let td5 = document.createElement('td');

	let img = document.createElement('img');
	img.src = dsh_img
	img.style.width = '50px';
	img.style.height = 'auto';

	td1.appendChild(img);
	td2.textContent = dsh_name;
	td3.textContent = `${dsh_kg} Kg`;
	td4.textContent = `${dsh_si}`;
	td5.textContent = `Php ${dsh_prize}`;

	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);
	tr.appendChild(td4);
	tr.appendChild(td5);

	tbl_dish_order.appendChild(tr);
};

const add_dish_order = () => {
	let dsh_name = selected_dish.value;
	let dsh_prize = selected_dish_price.value;
	let dsh_kg = select_kg.value;

	let dsh_selected = document.querySelector('input[name="dish"]:checked').nextSibling.childNodes[0].src;
	
	let objDishSelected = Object.create(null);
	objDishSelected.imgSrc = dsh_selected;
	objDishSelected.dsh_name = dsh_name;
	objDishSelected.dsh_kg = dsh_kg;
	objDishSelected.si = 'Special Instruction';
	objDishSelected.dsh_prize = dsh_prize;

	paluto_arr.push(objDishSelected);

	let kg_market = parseFloat(weight);

	let kg_total = 0;

	tbl_dish_order.innerHTML = '';

	paluto_arr.forEach(dsh => {

		insertTableDishOrder(dsh);

		let dsh_kg = dsh.dsh_kg;

		kg_total += parseFloat(dsh_kg);
	});

	if(kg_market != kg_total){
		let kg_diff = kg_market - kg_total;
		let dsh_prize = kg_diff * parseFloat(unit_price);

		let objRaw =  Object.create(null);

		objRaw.imgSrc = img;
		objRaw.dsh_name = subitem;
		objRaw.dsh_kg = kg_diff;
		objRaw.si = 'Special Instruction';
		objRaw.dsh_prize = dsh_prize;
		insertTableDishOrder(objRaw);
	}

}

const update_weight_limit = () => {
	let dsh_kg = parseFloat(select_kg.value);
	weight_limit -= dsh_kg;
}

const check_dialog_button = () => {
	if(weight_limit < 0.5){
		add_dish.disabled = 'true';
		add_dish.style.color = 'red'
	} 
}

const compute_total_paluto = () => {
	let dsh_prize = parseFloat(selected_dish_price.value);

	computed_paluto += dsh_prize;

	let totals = `Total Paluto: Php ${computed_paluto}`;
	
	let kg_market = parseFloat(weight);

	let kg_total = 0;

	paluto_arr.forEach(dsh => {

		let dsh_kg = dsh.dsh_kg;

		kg_total += parseFloat(dsh_kg);
	});

	if(kg_market != kg_total) {
		let kg_diff = kg_market - kg_total;
		let dsh_prize = kg_diff * parseFloat(unit_price);

		totals += `<br>Total Palengke: Php ${dsh_prize}`;
	}

	computed_paluto_disp.innerHTML = totals;

}

const removeShadow = () => {
	let articles = document.querySelectorAll('.card-2col');

	articles.forEach(art => {
		art.classList.remove('shadow-box');
	});
}

const reset_dialog = () => {
	selected_dish.value = '';
	selected_dish_price.value = '';
	select_kg.innerHTML = '';

	for(i = 0.5; i <= weight_limit; i += 0.5){
		let opt = document.createElement('option');
		opt.value = i;

		let txt = document.createTextNode(i);
		opt.appendChild(txt);

		select_kg.appendChild(opt);
	}

	removeShadow();
}

const toggleShadow = id => {

	removeShadow();

	let parent = document.querySelector(`#${id}`).parentNode;

	parent.classList.add('shadow-box');
}

const nextStep = e => {
	console.log(e.target.value)
	console.log(e.target.dataset.price);
	console.log('id', e.target.id)

	toggleShadow(e.target.id);

	selected_dish.value = e.target.value;
	selected_dish_price.value = e.target.dataset.price;

	if(document.getElementById("okBtn").disabled){
		document.getElementById("okBtn").disabled = false;
		document.getElementById("okBtn").style.color = 'inherit';
	} 

	document.querySelector('#flex-form-dish').scrollIntoView({
		behavior: 'smooth'
	});
}