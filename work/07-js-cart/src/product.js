const products = [
  { id: 1, name: 'Jorts', price: 0.99, imgUrl: 'http://placehold.co/150x150?text=Jorts' },
  { id: 2, name: 'Jean', price: 3.14, imgUrl: 'http://placehold.co/150x150?text=Jean' },
  { id: 3, name: 'Nyancat', price: 2.73, imgUrl: 'http://placehold.co/150x150?text=Nyancat' },
];
export function getProductById(id){
  return products.find(product => product.id === id);
}


export function renderProducts() {
  const productList = document.querySelector('.products');
  
  products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.innerHTML = `
      <div class="product-item">
        <img src="${product.imgUrl}" alt="${product.name}" />
        <p>${product.name} - $${product.price.toFixed(2)}</p>
        <button class="add-to-cart button" data-id="${product.id}">Add to Cart</button>
      </div>
    `;
    productList.appendChild(productElement);
  });
}

