const objParams = objUrlParams;
const restaurant = document.querySelector("#restaurant");
console.log('updated object:',objParams)


let prod = objParams.product;
let type = objParams.type;
let sub_type = objParams.subtype;
let size = objParams.size;
let kg1 = objParams.kg1;
let dishChoice1 = objParams.dishChoice1;
let price1 = objParams.price1;
let kg2 = 'kg2' in objParams ? objParams.kg2 : "0";
let dishChoice2 = 'dishChoice2' in objParams ? objParams.dishChoice2 : "-";
let price2 = 'price1' in objParams ? objParams.price1 : "0";

let total_kg= parseFloat(kg1) + parseFloat(kg2)

let str = `${prod} - ${type} - ${sub_type} - ${size} - ${total_kg} Kg`;

let dishes = `${dishChoice1} - ${kg1} Kg - ${price1}`;

if(dishChoice2 != '-'){
	dishes += ` ${dishChoice2} - ${kg2} Kg - ${price2}`;
}

let resto = objParams.resto;
resto = resto.replace('%20', ' ');

document.querySelector('#lead-card').innerHTML = `<h3>${objParams.product} Dish</h3><div>${str}</div>`;

let dishImg = `images/paluto/${objParams.dishChoice1}.png`;
let img = document.createElement('img');
img.src = dishImg;
let par = document.createElement("p");
par.textContent = `${objParams.kg1} Kg : P ${objParams.price1}`;

document.querySelector('#main-dish').appendChild(img);
document.querySelector('#main-dish').appendChild(par);

if ('dishChoice2' in objParams){
	let dishImg = `images/paluto/${objParams.dishChoice2}.png`;
	let img = document.createElement('img');
	img.src = dishImg;
	let par = document.createElement("p");
	par.textContent = `${objParams.kg2} Kg : P ${objParams.price2}`;

	document.querySelector('#next-dish').appendChild(img);
	document.querySelector('#next-dish').appendChild(par);
}

let restoImgFile = `images/restaurant/resto${objParams.resto_no}.png`;
let restoImg = document.createElement('img');
restoImg.src = restoImgFile;

let restoh3 = document.createElement('h3');
restoh3.textContent = `${resto}`;

restaurant.appendChild(restoImg);
restaurant.appendChild(restoh3);

document.querySelector("#restaurant").style.textAlign = "center";

