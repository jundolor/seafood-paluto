const product = !(objUrlParams.product === null)? objUrlParams.product : '';
const size  = !(objUrlParams.size === null)? objUrlParams.size : '';
const price = !(objUrlParams.price === null)? objUrlParams.price : '';
const kilo = !(objUrlParams.kilo === null)? objUrlParams.kilo : '';
const dish_id = !(objUrlParams.dish_id === null)? objUrlParams.dish_id : '';
const dish = !(objUrlParams.dish === null)? objUrlParams.dish : 'y:y';
const paluto_price = !(objUrlParams.paluto_price === null)? objUrlParams.paluto_price : '';
const product_kilo = document.querySelector('#product-kilo');
const good_for = document.querySelector('#good-for');
const next_page = document.querySelector('#next-page');

let imgpath1 = `images/palengke/${product}-${size}.png`
let imgpath2 = `images/paluto/${dish_id}.png`

document.querySelector('#img1').src = imgpath1;
document.querySelector('#img2').src = imgpath2;

const productCap = product.charAt(0).toUpperCase() + product.slice(1);
const sizeCap = size.charAt(0).toUpperCase() + size.slice(1);

const dish_arr = dish.split(':');

document.querySelector('#title1').textContent = `${productCap}, ${sizeCap}: ${kilo} Kg`;
document.querySelector('#title2').textContent = `${dish_arr[0].replace('%20', ' ')}`;

product_kilo.selectedIndex = -1;
for(let i = 0; i < product_kilo.length; i++){
	if(product_kilo[i].value == kilo){
		product_kilo.selectedIndex = i;
		break;
	}
}

document.querySelector('#paluto-charge').value = paluto_price;
good_for.textContent = `Good for ${getMaxPerson(kilo)}`;

next_page.addEventListener('click', e => {
	e.preventDefault();

	window.location.href = `weight_dish_restaurant.html?product=${product}&size=${size}&price=${price}&kilo=${kilo}&dish_id=${dish_id}&dish=${dish}&paluto_price=${paluto_price}`;
});