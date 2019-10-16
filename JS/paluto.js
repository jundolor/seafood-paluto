const orders_URL = !(objUrlParams.orders === null)? objUrlParams.orders : '';
const orders = decodeURI(orders_URL);
const objOrders = JSON.parse(orders);

const style = objOrders.style;
const item = objOrders.item;
const img = objOrders.img;
const subitem = objOrders.subitem;
const prod_details = objOrders.prod_details;
const weight = objOrders.weight;
const market_price = objOrders.market_price;
const restaurant = objOrders.restaurant;
let paluto = objOrders.paluto;
let paluto_price = objOrders.paluto_price;

const add_dish = document.querySelector('#add-dish');
const dialog = document.querySelector('#dialog1');

const url = `JS/json/dishes.json`;
const dishes = [];
const cards = document.querySelector('#cards');

let itmImg = document.createElement('img');
itmImg.src = img;

//populate the item info
const txt1 = document.createTextNode(`${subitem} @ Php ${market_price}`);
const txt2 = document.createTextNode(`Ordered: ${weight} Kg`);
const txt3 = document.createTextNode('Total Palengke')

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
		dialog.showModal()
	});

	// add event listeners for the OK and Cancel buttons
    document.getElementById("okBtn").addEventListener("click", function () {
        dlg = document.getElementById("dialog1");
        // Check to see if the dialog is in fact open, if so then close it with "OK"
        if (dlg.open) {
            dlg.close("OK");
        }
    })
    document.getElementById("cancelBtn").addEventListener("click", function () {
        dlg = document.getElementById("dialog1");
        // Check to see if the dialog is in fact open, if so then close it with "Cancel"
        if (dlg.open) {
            dlg.close("Cancel");
        }
    })

    // event listeners for the dialog itself - close and cancel
    dlg = document.getElementById("dialog1");
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

const toggleShadow = id => {
	let articles = document.querySelectorAll('.card-2col');

	articles.forEach(art => {
		art.classList.remove('shadow-box');
	});

	let parent = document.querySelector(`#${id}`).parentNode;

	parent.classList.add('shadow-box');
}

const nextStep = e => {
	console.log(e.target.value)
	console.log(e.target.dataset.price);
	console.log('id', e.target.id)

	toggleShadow(e.target.id);
}