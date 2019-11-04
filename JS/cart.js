let db;
const cart = document.querySelector('#cart');
const order_specifics = document.querySelector('#order-specifics');
const checkout = document.querySelector('#checkout');

window.onload = () => {
	let request = window.indexedDB.open('cart', 1);

	request.onerror = function(){
		console.log('Database failed to open');
	}

	request.onsuccess = function(){
		console.log("Datbase opened successfully");

		db = request.result;

		displayOrders();
	}

    function displayOrdersPalengke(obj){
        let id = obj.id;
        let subitem = obj.subitem;
        let paluto = obj.paluto;
        let mode = obj.mode;
        let weight = obj.weight;
        let market_price = obj.market_price;
        let paluto_price = obj.paluto_price

        let tr = document.createElement('tr');
        tr.dataset.contactId = id;

        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let td4 = document.createElement('td');
        let td5 = document.createElement('td');
        let td6 = document.createElement('td');
        let td7 = document.createElement('td');

        td1.textContent = subitem;
        td2.textContent = paluto != "" ? `${paluto} / ${mode}`: `Palengke / ${mode}`
        if(weight != '') td3.textContent = `${weight} Kg.`;
        else td3.textContent = ''
        
        td4.textContent = market_price;
        td5.textContent = paluto_price;

        let total_price = parseFloat(market_price);
        if(paluto_price != "")  total_price += parseFloat(paluto_price);
        
        td6.textContent = total_price;

        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        td7.appendChild(deleteButton);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);

        cart.appendChild(tr);

        deleteButton.onclick = deleteItem;
    }


	function displayOrders(){
		let objectCart = db.transaction('cart').objectStore('cart');
        let ind_order_specifics = document.createDocumentFragment();

		objectCart.openCursor().onsuccess = function(e) {
            let cursor = e.target.result;

            if(cursor) {

                let id = cursor.value.id;
                let subitem = cursor.value.subitem;
                let paluto = cursor.value.paluto;
                let mode = cursor.value.mode;
                let weight = cursor.value.weight;
                let market_price = cursor.value.market_price;
                let paluto_price = cursor.value.paluto_price

                if(cursor.value.style == 'palengke'){
                    let obj = Object.create(null);
                    obj.id = id;
                    obj.subitem = subitem;
                    obj.paluto = paluto;
                    obj.mode = mode;
                    obj.weight = weight;
                    obj.market_price = market_price;
                    obj.paluto_price = paluto_price;

                    displayOrdersPalengke(obj);
                }
                else if(cursor.value.style == 'paluto' && cursor.value.restaurant != ''){
                    let restaurant = cursor.value.restaurant;

                    let obj = Object.create(null);
                    let paluto_obj = JSON.parse(paluto);
                    obj.id = id;
                    if(paluto_obj.style == 'paluto') obj.subitem = `${subitem} / ${paluto_obj.dsh_name}`;
                    else obj.subitem = `${subitem}`;
                    obj.paluto = `${restaurant}`;
                    obj.mode = mode;
                    obj.weight = `${paluto_obj.dsh_kg}`;
                    obj.market_price = paluto_obj.mkt_prize;
                    obj.paluto_price = paluto_obj.dsh_prize;

                    displayOrdersPalengke(obj);
                }

                cursor.continue();
            } 
            console.log('orders displayed!!!');

        }
	}

	function deleteItem(e) {

        let cartId = Number(e.target.parentNode.parentNode.getAttribute('data-contact-id'));

        let transaction = db.transaction(['cart'], 'readwrite');
        let objectCart = transaction.objectStore('cart');
        let request = objectCart.delete(cartId);

        transaction.oncomplete = () => {
            e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);

            console.log(`cart ${cartId} is deleted!`);
        }
    }

    checkout.addEventListener('click', e => {
        window.location.href = 'checkout.html';
    });
}