const product = !(objUrlParams.product === null)? objUrlParams.product : '';
const size  = !(objUrlParams.size === null)? objUrlParams.size : '';
const price  = !(objUrlParams.price === null)? objUrlParams.price : '';
const prod_img = document.querySelector('#prod-img');
const wt_title = document.querySelector('#wt-title');
const price_per_kilo = document.querySelector('#price-per-kilo');
const next_page = document.querySelector("#next-page");

console.log(product);

//populate the image
prod_img.src = `images/palengke/${product}-${size}.png`;

const productCap = product.charAt(0).toUpperCase() + product.slice(1);
const sizeCap = size.charAt(0).toUpperCase() + size.slice(1);


wt_title.textContent = `${productCap}, ${sizeCap}`;

price_per_kilo.textContent = `Price: ${price}/Kilo`;


next_page.addEventListener('click', e => {
	e.preventDefault();

	let kilo = document.querySelector('#kilo-qty').value

	window.location.href = `weight_dish.html?product=${product}&size=${size}&price=${price}&kilo=${kilo}`;
});