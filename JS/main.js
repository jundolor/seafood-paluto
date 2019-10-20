const advanced_nav = document.querySelector('#advanced-nav');
const menu_toggle = document.querySelector('button.menu-toggle');
const urlSite = window.location.href;
const url_params = urlSite.slice(urlSite.indexOf('?') + 1); //add offset of 1
const objUrlParams = Object.create(null);

menu_toggle.addEventListener('click', () => {

	if(advanced_nav.className=='advanced-nav menu'){
		advanced_nav.className = 'advanced-nav-auto menu';
	}
	else{
		advanced_nav.className ='advanced-nav menu';
	}

	menu_toggle.blur()
});

url_params.split('&').forEach(x => {
	let elems = x.split('=');
	let key = elems[0];
	let value = elems[1];

	if(!(key in objUrlParams)) objUrlParams[key] = value;
	else objUrlParams[key] += value;
});

console.log(objUrlParams)

const getMaxPerson = kg => {
	let max = '10-12 Pax';

	switch (kg){
		case '0.5':
			max = '1-3 Pax';
			break;
		case '1':
			max = '4-7 Pax';
			break;
		case '1.5':
			max = '8-9 Pax';
			break;
		case '2':
			max = '10-12 Pax';
			break;
		case '2.5':
			max = '13-14 Pax';
			break;
		case '3':
			max = '14-15 Pax';
			break;
		case '3.5':
			max = '16-17 Pax';
			break;
		default :
			max = '18 and more Pax';
			break;
	}

	return max;
}

const init_radio_img_list = () => {
	console.log('initialize link between graphic and list radio button list');
	//be sure to init radio_img and radio_list before calling
	radio_img.forEach(el => {
		el.addEventListener('click', () => {
			let id =  el.dataset.gid;
			let value = el.value;
			console.log(id);

			let listCounterPart = `list-resto${id}`;

			radio_list.forEach(el2 => {
				el2.checked = false;
			});

			document.querySelector(`#${listCounterPart}`).checked = true;

			let rad_checked = document.querySelector('input[name="acc-resto"]:checked');
			rad_checked.parentNode.classList.add('shadow-box');

			document.querySelector("#selected_restaurant").textContent = `Selected Restaurant: ${value}`;

			document.querySelector('#selected_restaurant').scrollIntoView({ 
			  behavior: 'smooth' 
			});
		});
	});


	radio_list.forEach(rl => {
		rl.addEventListener('click', () => {
			let id = rl.dataset.lid;
			console.log(id);

			let imgCounterPart = `acc-resto${id}`;

			radio_img.forEach(el2 => {
				el2.checked = false;
			});

			document.querySelector(`#${imgCounterPart}`).checked = true;

			let rad_checked = document.querySelector('input[name=acc-resto]:checked');
			rad_checked.parentNode.classList.add('shadow-box');

			let value = document.querySelector('input[name=acc-resto]:checked').value;
			document.querySelector("#selected_restaurant").textContent = `Selected Restaurant: ${value}`;

			document.querySelector('#selected_restaurant').scrollIntoView({ 
			  behavior: 'smooth' 
			});
		})
	});
}