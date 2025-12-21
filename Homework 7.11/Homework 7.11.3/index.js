const shoppingCartContainer = document.getElementById('shopping-cart');
const addItemBtn = document.getElementById('add-item-btn');

let itemsInCart = ['Апельсин', 'Груша', 'Яблоко'];

function renderShoppingCart() {
    shoppingCartContainer.innerHTML = '';
    itemsInCart.sort().forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = item;
        shoppingCartContainer.appendChild(itemDiv);
    });
}

renderShoppingCart();

addItemBtn.addEventListener('click', () => {
    const newItem = prompt('Введите название товара:');
    if (!newItem.trim()) {
        alert('Название товара не введено!');
        return;
    }
    itemsInCart.push(newItem);
    renderShoppingCart();
});
