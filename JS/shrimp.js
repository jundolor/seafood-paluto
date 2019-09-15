const next_page = document.querySelector("#next-page");

next_page.addEventListener('click', e => {
	e.preventDefault();

	let shrimp = document.querySelector('input[name=shrimp]:checked')

	let size = shrimp.value;
	let price = shrimp.dataset.priceKilo;

	console.log('size', size);
	console.log('price', price);

	window.location.href = `weight.html?product=shrimp&size=${size}&price=${price}`;
});