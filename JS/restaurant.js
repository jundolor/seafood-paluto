
const objParams = objUrlParams;
const next_page = document.querySelector("#next-page");
const radio_img =  document.querySelectorAll('.radio-image');
const radio_list = document.querySelectorAll('.radio-list');

console.log('updated object:',objParams)

const lead_card = document.querySelector('#lead-card');

let lead_h3 = document.createElement("h3");
lead_h3.innerHTML = `${objParams.product} Dish`;

let lead_hr = document.createElement("hr");


let total_kg = parseFloat(objParams.kg1) + parseFloat(objParams.kg2);

let lead_div = document.createElement("div");
lead_div.innerHTML = `${objParams.type}, ${objParams.subtype}, ${objParams.size}<br>Total: ${total_kg} Kg`;


lead_card.appendChild(lead_h3);
lead_card.appendChild(lead_div);


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

next_page.addEventListener('click', () => {
	let str = 'val=dummy';
	for(let [key, value] of Object.entries(objParams)){
		str += `&${key}=${value}`;
	}

	let resto = document.querySelector('input[name=acc-resto]:checked')
	str += `&resto=${resto.value}`;

	let resto_no = resto.dataset.gid;
	str += `&resto_no=${resto_no}`;

	window.location.href = `summary.html?${str}`;
});

init_radio_img_list();