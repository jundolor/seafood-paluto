const slideList = document.querySelector('ul.hs');
slideList.innerHTML = '';
const crabs = [];

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

const nextStep = type => {
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
}