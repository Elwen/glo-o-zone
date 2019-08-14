'use strict';

// filter checkboxes

const filterCheckboxed = document.querySelectorAll('.filter-check_checkbox');

filterCheckboxed.forEach((el) => {
    el.addEventListener('change', function() {
        if (this.checked) {
            this.nextElementSibling.classList.add('checked');
        } else {
            this.nextElementSibling.classList.remove('checked');
        }
    });
});

// end filter checkboxes


// cart

const   btnOpenCart = document.querySelector('#cart'),
        modalCart = document.querySelector('.cart'),
        btnCloseCart = document.querySelector('.cart-close');

btnOpenCart.addEventListener('click', () => {
    modalCart.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

btnCloseCart.addEventListener('click', () => {
    modalCart.style.display = '';
    document.body.style.overflow = '';
});

// end cart


// work with card

const   cards = document.querySelectorAll('.goods .card'),
        cartWrapper = document.querySelector('.cart-wrapper'),
        cartEmpty = document.querySelector('#cart-empty'),
        countGoods = document.querySelector('.counter');

cards.forEach((card) => {
    const btnAddToCart = card.querySelector('.btn-primary');
    btnAddToCart.addEventListener('click', () => {
        const cardClone = card.cloneNode(true);
        cartWrapper.appendChild(cardClone);
        cartEmpty.remove();
        updateCountGoods();
    });
});

function updateCountGoods() {
    const cardsCart = cartWrapper.querySelectorAll('.card');
    countGoods.textContent = cardsCart.length;
}

// end work with card