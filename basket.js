'use strict';

const basketElem = document.querySelector('.basket');

window.addEventListener('click', ({ target }) => {
    if (basketElem.classList[1]) {
        if (target.classList.value !== 'cartIcon') {
            return;
        }
        basketElem.classList.remove('hidden');
    } else {
        if (target.classList.value === 'basket' ||
            target.parentNode.classList.value === 'basket' ||
            target.parentNode.parentNode.classList?.value === 'basket') {
            return;
        }
        basketElem.classList.add('hidden');
    }
});

// Закрываем при клике в любое место страницы, кроме самой корзины;

const itemsElem = document.querySelector('.featuredItems');
const itemCounterValue = document.querySelector('.itemCounter');
const basketRow = document.querySelector('.basketRow');
const totalBasket = document.querySelector('.basketTotalValue');

class Item {
    constructor(name, price, id) {
        this.name = name;
        this.price = price;
        this.id = id;
        this.position = 1;
    }
}

let basket = {
    items: [],
    names: [],
    counters: [1, 1, 1, 1, 1, 1],
    amountOfItems: 0,
    sum: 0,
    addItem(Item) {
        this.sum += Item.price;
        totalBasket.innerText = this.sum;
        itemCounterValue.innerText = ++this.amountOfItems;
        if (!this.names.includes(Item.name)) {
            Item.position = this.items.length + 1;
            this.items.push(Item);
            this.names.push(Item.name);
            this.makeHTML(Item.name, Item.price);
        } else {
            let i = 0;
            for (let el of this.items) {
                i++;
                if (el.id === Item.id) {
                    Item.position = el.position
                }
            }
            basketRow.querySelector(`span:nth-of-type(${(Item.
                position * 4) - 2}n)`).innerText = ++this.
                    counters[Item.position - 1];
            basketRow.querySelector(`span:nth-of-type(${Item.
                position * 4}n)`).innerText = this.
                    counters[Item.position - 1] * Item.price;
        }
    },
    makeHTML(name, price) {
        const row = [];
        for (let i = 0; i < 4; i++) {
            row[i] = document.createElement('span');
        }
        row[0].textContent = `${name}`;
        row[1].textContent = `${1}`;
        row[2].textContent = `${price}`;
        row[3].textContent = `${price * 1}`;
        for (let i = 0; i < 4; i++) {
            basketRow.appendChild(row[i]);
        }
    }
};

itemsElem.addEventListener('click', ({ target }) => {
    if (target.classList.value !== "addToCart") {
        return;
    }
    const item = new Item(target.parentNode.parentNode.nextElementSibling.
        querySelector('.featuredName').innerText, +target.parentNode.
            parentNode.nextElementSibling.querySelector('.featuredPrice').
            innerText.slice(1), target.id);
    basket.addItem(item);
});