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

const populate_bilao = data => {
	data.bilao.forEach(el => {
		let subtype = el.subtype;
		let img_bilao = el.img;
		let size = el.size;
		let persons = el.persons;
		let prize = el.prize;

		let li = document.createElement('li');
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
	})
};