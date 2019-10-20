const bilao = document.querySelector('#bilao');

(function(){
	fetch('JS/json/bilao.json')
	.then(response => {
		if(!response.ok) throw Error(response.statusText);

		return response.json();
	})
	.then(bilao_data => {
		console.log(bilao_data);
		populate_bilao(bilao_data);
	})
	.catch(error => {
		console.log(error)
	})
})();

const bilao_order = id => {
	let order = document.querySelector(`#${id}`);

	subtype = order.dataset.subtype;
	img_bilao = order.dataset.img;
	size = order.dataset.size;
	persons = order.dataset.persons;
	prize = order.dataset.prize;

	let ordersObj = Object.create(null);
	ordersObj.style = 'palengke';
	ordersObj.item = 'Bilao';
	ordersObj.img = img_bilao;
	ordersObj.subitem = subtype;
	ordersObj.prod_details = `Size: ${size} / Good for ${persons} persons`;
	ordersObj.unit_price = prize;
	ordersObj.weight = '';
	ordersObj.market_price = prize;
	ordersObj.restaurant = '';
	ordersObj.paluto = 'Bilao';
	ordersObj.paluto_price = '';

	let str = JSON.stringify(ordersObj);

	let orders_url = encodeURI(str);

	window.location.href = `order_summary.html?orders=${orders_url}`;
};

const populate_bilao = data => {
	data.bilao.forEach(el => {
		let id = el.id;
		let subtype = el.subtype;
		let img_bilao = el.img;
		let size = el.size;
		let persons = el.persons;
		let prize = el.prize;

		let li = document.createElement('li');
		li.id = id;
		li.dataset.subtype = subtype;
		li.dataset.img = img_bilao;
		li.dataset.size = size;
		li.dataset.persons = persons;
		li.dataset.prize = prize;

		let img = document.createElement('img');
		img.src = img_bilao;

		let txt = document.createTextNode(subtype);

		let h4 = document.createElement('h4');
		h4.style.marginTop = '0.5em';
		h4.style.marginBottom = '0.5em';
		h4.appendChild(txt);

		let p = document.createElement('p');
		p.style.marginTop = '0.5em';
		p.style.marginBottom = '0.5em';
		p.style.fontSize = '0.8em';
		p.innerHTML = `Size: ${size}<br>Price: Php ${prize}<br>Good for ${persons} persons<br>Order Now <i class="fa fa-arrow-circle-right"></i>`;

		li.appendChild(img);
		li.appendChild(h4);
		li.appendChild(p);

		bilao.appendChild(li);

		li.addEventListener('click', () => {bilao_order(id)});
	})
};