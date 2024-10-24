import { getProductById } from "./product";

let cart = {};

export function initCart() {
  const viewCartBtn = document.querySelector('.view-cart-btn');
  const cartContainer = document.querySelector('.cart-container');
  const hideCartBtn = document.querySelector('.hide-cart-btn');
  const checkoutBtn = document.querySelector('.checkout-btn');

  document.querySelector('.products').addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
      const productId = e.target.getAttribute('data-id');
      addToCart(parseInt(productId));
      updateCartCount();
      renderCart();
    }
  });

  viewCartBtn.addEventListener('click', () => {
    viewCartBtn.classList.add('hidden');
    viewCartBtn.classList.remove('visible');
    hideCartBtn.classList.remove('hidden');
    hideCartBtn.classList.add('visible');
    cartContainer.style.display = 'block';
    renderCart();
  });

  hideCartBtn.addEventListener('click', () => {
    hideCartBtn.classList.remove('visible');
    hideCartBtn.classList.add('hidden');
    viewCartBtn.classList.remove('hidden');
    cartContainer.style.display = 'none';
  });

  checkoutBtn.addEventListener('click', () => {
    cart = {};

    renderCart();

    hideCartBtn.classList.add('hidden');
    hideCartBtn.classList.remove('visible');
    viewCartBtn.classList.remove('hidden');

    cartContainer.classList.add('hidden');
    cartContainer.style.display = 'none';

    updateCartCount();
  });

  updateCartCount();
}

function addToCart(productId) {
  if (cart[productId]) {
    cart[productId]++;
  } else {
    cart[productId] = 1;
  }
}

function renderCart() {
  const cartItems = document.querySelector('.cart-items');
  cartItems.innerHTML = '';


  const totalCartPrice = Object.keys(cart).reduce((total, productId) => {
    const quantity = cart[productId];
    const product = getProductById(parseInt(productId));

    if (quantity > 0) {
      const itemTotal = (product.price * quantity).toFixed(2);

      const itemElement = document.createElement('div');
      itemElement.innerHTML = `
        <div class="cart-item">
          <img class="cart__image" src="${product.imgUrl}" alt="${product.name}" />
          <p>${product.name} - $${product.price.toFixed(2)} x ${quantity} = $${itemTotal}</p>
          <input type="text" min="1" value="${quantity}" class="cart-quantity" data-id="${product.id}">
        </div>
      `;
      cartItems.appendChild(itemElement);

      return total + parseFloat(itemTotal);
    }

    return total;
  }, 0);

  if (totalCartPrice > 0) {
    const totalElement = document.createElement('div');
    totalElement.innerHTML = `<h3>Total: $${totalCartPrice.toFixed(2)}</h3>`;
    cartItems.appendChild(totalElement);
  } else {
    cartItems.innerHTML = '<p>Nothing in the cart</p>';
  }

  document.querySelector('.cart-items').addEventListener('change', (e) => {
    if (e.target.classList.contains('cart-quantity')) {
      const productId = parseInt(e.target.getAttribute('data-id'));
      const newQuantity = parseInt(e.target.value);
      updateCart(productId, newQuantity);
      renderCart();
      updateCartCount();
    }
  });
}




function updateCart(productId, quantity) {
  if (quantity <= 0) {
    delete cart[productId];
  } else {
    cart[productId] = quantity;
  }
}

function updateCartCount() {
  const totalItems = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const viewCartBtn = document.querySelector('.view-cart-btn');

  if (totalItems > 0) {
    viewCartBtn.textContent = `View Cart (${totalItems})`;
  } else {
    viewCartBtn.textContent = 'View Cart';
  }
}

