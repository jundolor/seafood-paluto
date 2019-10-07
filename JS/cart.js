let db;
const cart = document.querySelector('#cart');

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

	function displayOrders(){
		let objectCart = db.transaction('cart').objectStore('cart');
		objectCart.openCursor().onsuccess = function(e) {
            let cursor = e.target.result;

            if(cursor) {
                let tr = document.createElement('tr');
                tr.dataset.contactId = cursor.value.id;

                let td1 = document.createElement('td');
                let td2 = document.createElement('td');
                let td3 = document.createElement('td');
                let td4 = document.createElement('td');
                let td5 = document.createElement('td');
                let td6 = document.createElement('td');
                let td7 = document.createElement('td');

                td1.textContent = cursor.value.subitem;
                td2.textContent = cursor.value.paluto != "" ? cursor.value.paluto: 'Palengke'
                td3.textContent = `${cursor.value.weight} Kg`;
                td4.textContent = cursor.value.market_price;
                td5.textContent = cursor.value.paluto_price;

                let total_price = parseFloat(cursor.value.market_price);
                if(cursor.value.paluto_price != "")  total_price += parseFloat(cursor.value.paluto_price);
                
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

                cursor.continue();
            } else {
            	/*
                if(!list.firstChild) {
                    let listItem = document.createElement('li');
                    listItem.textContent = 'No contacts store.';
                    list.appendChild(listItem);
                }
                */
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
            /*
            if(!list.firstChild) {
                let listItem = document.createElement('li');
                listItem.textContent = 'No contacts store.';
                list.appendChild(listItem);
            }
            */
        }
    }
}