const payment = objUrlParams.payment;
const order_confirmed = document.querySelector('#order_confirmed');

order_confirmed.style.padding = '5px';

const order_processing = () => {
	const h2 = document.createElement('h2');
	h2.textContent = 'Your order has been placed';

	//rand
	const rand = (""+Math.random()).substring(2,7)

	const p1 =document.createElement('p');
	p1.textContent = `Here is your tracking number: ${rand}. Thank you and have a nice day ahead`;

	order_confirmed.appendChild(h2);
	order_confirmed.appendChild(p1);
}

const order_cancelled = () => {
	const h2 = document.createElement('h2');
	h2.textContent = 'Your order was not placed';

	const p1 =document.createElement('p');
	p1.textContent = `Your order was cancelled or failed. Thank you and have a nice day ahead`;

	order_confirmed.appendChild(h2);
	order_confirmed.appendChild(p1);
}

if(payment == 'cod' || payment == 'card-ok'){
	order_processing();
}
else {
	order_cancelled();
}