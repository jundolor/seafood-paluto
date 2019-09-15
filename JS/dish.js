const cuttOff = 2;
const objParams = objUrlParams;
const dishes = document.querySelectorAll('.set-dish');
const next_page = document.querySelector('#next-page');
const mainKgContainer = document.querySelector("#mainKg");
const remainKgContainer =document.querySelector("#remainKg");
const firstSelectedContainer = document.querySelector('#first-selected');
const secondSelectedContainer = document.querySelector('#second-selected');
const objDishArr = [];


console.log('updated object:',objParams)
/*
if value <3, we only allow 1 selection
else we allow 2
*/
const lead_card = document.querySelector('#lead-card');

let lead_h3 = document.createElement("h3");
lead_h3.textContent = `Product ${objParams.product} selected`;

let lead_div = document.createElement("div");
lead_div.innerHTML = `${objParams.type}, ${objParams.subtype}, ${objParams.size}<br>Total to use: ${objParams.qty} Kg`;

lead_card.appendChild(lead_h3);
lead_card.appendChild(lead_div);


let totalKg = parseFloat(objParams.qty);
let mainKg = 0, remainKg = 0;

if(totalKg >= cuttOff){
	mainKg = cuttOff;
	remainKg = totalKg - mainKg;
}
else{
	mainKg = totalKg;
	remainKg = 0;
}

mainKgContainer.value = mainKg;
remainKgContainer.value = remainKg;

document.querySelector("#use-first").textContent = `Use this much ${mainKg} Kg`;
document.querySelector("#use-next").textContent = `Remaining to use ${remainKg} Kg`;

const moveToRestaurant = () => {
	let product = objParams.product;
	let type = objParams.type;
	let subtype = objParams.subtype;
	let size = objParams.size;

	let str = `product=${product}&type=${type}&subtype=${subtype}&size=${size}`;
	let ctr = 1;
	objDishArr.forEach(x => {
		str += `&dishChoice${ctr}=dish${x.dish}&price${ctr}=${x.price}`;
		ctr += 1;
	});

	str += `&kg1=${mainKgContainer.value}&kg2=${remainKgContainer.value}`;

	//console.log(str);
	window.location.href = `restaurant.html?${str}`;
}

const nextLink = () => {
	let addLink = "No";
	if(mainKgContainer.value != "0" && remainKgContainer.value != "0" &&firstSelectedContainer.value == "Yes" && secondSelectedContainer.value == "Yes"){
		addLink = "Yes";
	}
	else if(mainKgContainer.value != "0" && remainKgContainer.value == "0" && firstSelectedContainer.value == "Yes"){
		addLink = "Yes";
	}

	if(addLink == "Yes"){
		document.querySelector('#select-dish').textContent = 'Click Next for restaurant of choice.';
		next_page.innerHTML = 'Next <i class="fa fa-arrow-circle-right"></i>';

		next_page.addEventListener('click', () => {
			console.log('test');
			moveToRestaurant();
		})
	}
}

const dishPrice = (dish, price) => {
	console.log(dish);
		console.log(price);

		let dishImg = 'images/paluto/dish' + dish + '.png';
		let img = document.createElement('img');
		img.src = dishImg;
		let par = document.createElement("p");
		par.textContent = `P ${price}`;

		let id = '#s1';

		if(firstSelectedContainer.value == ''){
			if(document.querySelector("#remainKg").value != "0"){
				document.querySelector('#select-dish').textContent = 'Select second dish from below';
			}

			document.querySelector('#main-dish').appendChild(img);
			document.querySelector('#main-dish').appendChild(par);
			firstSelectedContainer.value = 'Yes';		

			objDishArr.push({dish: dish, price: price});	
		}
		else if(secondSelectedContainer.value == '' & document.querySelector('#remainKg').value != "0"){
			document.querySelector('#next-dish').appendChild(img);
			document.querySelector('#next-dish').appendChild(par);
			secondSelectedContainer.value = 'Yes';

			id = '#s2';

			objDishArr.push({dish: dish, price: price});
		}
		else{
			document.querySelector('#select-dish').textContent = 'All dishes filled';

			id = '#select-dish';
		}

		return id;
}

dishes.forEach(el => {
	el.addEventListener('click', e => {
		e.preventDefault();

		let id = dishPrice(el.dataset.dish, el.dataset.price);
		nextLink();

		document.querySelector(id).scrollIntoView({ 
		  behavior: 'smooth' 
		});

	})
});

