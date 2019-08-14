'use strict';

// filter checkboxes

function toggleCheckbox() {
  const filterCheckboxed = document.querySelectorAll('.filter-check_checkbox');

  filterCheckboxed.forEach((el) => {
    el.addEventListener('change', function () {
      if (this.checked) {
        this.nextElementSibling.classList.add('checked');
      } else {
        this.nextElementSibling.classList.remove('checked');
      }
    });
  });
}


// filters & search

function actionPage() {
  const cards = document.querySelectorAll('.goods .card'),
    discountCheckbox = document.querySelector('#discount-checkbox'),
    goods = document.querySelector('.goods'),
    minPrice = document.querySelector('#min'),
    maxPrice = document.querySelector('#max'),
    searchInput = document.querySelector('.search-wrapper_input'),
    searchBtn = document.querySelector('.search-btn');


  minPrice.addEventListener('keyup', filter);
  maxPrice.addEventListener('keyup', filter);
  discountCheckbox.addEventListener('click', filter);
  searchBtn.addEventListener('click', filter);
  searchInput.addEventListener('keyup', (e) => {
    if (e.which === 13 || e.keyCode === 13) {
      filter();
    }
  });

  function filter() {
    const searchText = new RegExp(searchInput.value.trim(), 'i');

    cards.forEach((el) => {
      const cardPrice = el.querySelector('.card-price');
      const price = parseFloat(cardPrice.textContent);
      const title = el.querySelector('.card-title');

      if (
        (minPrice.value && price < minPrice.value) ||
        (maxPrice.value && price > maxPrice.value) ||
        (discountCheckbox.checked && !el.querySelector('.card-sale')) ||
        !searchText.test(title.textContent)
      ) {
        el.parentNode.remove();
      } else {
        goods.appendChild(el.parentNode);
      }
    });
  }
}


// cart

function toggleCart() {
  const btnOpenCart = document.querySelector('#cart'),
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
}


// work with card

function updateCart() {
  const cards = document.querySelectorAll('.goods .card'),
    cartWrapper = document.querySelector('.cart-wrapper'),
    cartEmpty = document.querySelector('#cart-empty'),
    countGoods = document.querySelector('.counter'),
    cardPrice = document.querySelectorAll('.card-price'),
    cardTotal = document.querySelector('.cart-total span');

  cards.forEach((card) => {
    const btnAddToCart = card.querySelector('.btn-primary');
    btnAddToCart.addEventListener('click', () => {
      const cardClone = card.cloneNode(true);
      cartWrapper.appendChild(cardClone);
      updateData();

      const btnRemoveCart = cardClone.querySelector('.btn');
      btnRemoveCart.classList.remove('btn-primary');
      btnRemoveCart.classList.add('btn-danger');
      btnRemoveCart.style.cssText = 'background: #dc3545; border-color: #dc3545';
      btnRemoveCart.textContent = 'Удалить из корзины';
      btnRemoveCart.addEventListener('click', function () {
        this.closest('.card').remove();
        updateData();
      });
    });
  });

  function updateData() {
    const cardsCart = cartWrapper.querySelectorAll('.card'),
      cardPrice = cartWrapper.querySelectorAll('.card-price');
    let sum = 0;

    countGoods.textContent = cardsCart.length;

    cardPrice.forEach((el) => {
      let price = parseFloat(el.textContent);
      sum += price;
    });
    cardTotal.textContent = sum;

    if (cardsCart.length !== 0) {
      cartEmpty.remove();
    } else {
      cartWrapper.appendChild(cartEmpty);
    }
  }
}


toggleCheckbox();
toggleCart();
updateCart();
actionPage();
