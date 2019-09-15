const choose_subtype = document.querySelector("#choose-subtype");

const selected_choice = document.querySelector('#selected-choice');

const choices = document.querySelectorAll('.order-main');

const subtype_food = document.querySelectorAll('.subtype-food');

const product_subtype_select = document.querySelector('#product-subtype')

const flex_form = document.querySelector('#flex-form');

const next_page = document.querySelector("#next-page");

choices.forEach(el => {
	el.addEventListener('click', () => {
		//e.preventDefault();
		const choice = el.dataset.mainOrder;
		console.log(choice);

		selected_choice.value = choice;

		if(subtype.className=='post-content subtype-init'){
			subtype.className = 'post-content subtype-full';

		}
		
		document.querySelectorAll('.order-main').forEach(el2 => {

			el2.style.backgroundColor = "#FFF";
		});
		
		el.style.backgroundColor = "#CCD1D1";

		choose_subtype.textContent = `Select subtype for ${choice}`;

		document.querySelector('#choose-subtype').scrollIntoView({ 
		  behavior: 'smooth' 
		});
		
	})
});

subtype_food.forEach(sf => {
	sf.addEventListener('click', () =>{
		let selected_subtype = sf.value;
		console.log(selected_subtype);

		for(let i = 0;  i < product_subtype_select.length; i++){
			if(product_subtype_select.options[i].value == selected_subtype){
				product_subtype_select.selectedIndex = i;
				break;
			}
		}

		if(flex_form.className == 'flex-form form-init'){
			flex_form.className = 'flex-form form-full';
		}

		document.querySelector('#flex-form').scrollIntoView({ 
		  behavior: 'smooth' 
		});

	});
});


next_page.addEventListener('click', e => {
	e.preventDefault();

	let product = document.querySelector('#product').value;
	let product_type = selected_choice.value;
	let product_subtype = product_subtype_select.value;
	let product_size = document.querySelector('#product-size').value;
	let product_qty = document.querySelector('#product-qty').value;

	window.location.href =`product-dish.html?product=${product}&type=${product_type}&subtype=${product_subtype}&size=${product_size}&qty=${product_qty}`;
});



