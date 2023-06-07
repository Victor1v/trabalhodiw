const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchQuery = searchInput.value;
  if (searchQuery) {
    window.location.href = `search.html?query=${searchQuery}`;
  }
});

function displayProducts(products) {
    const productList = document.querySelector('.product-list-items');
    productList.innerHTML = '';
  
    if (Array.isArray(products)) {
      if (products.length > 0) {
        products.forEach((product) => {
          const li = createProductListItem(product);
          productList.appendChild(li);
        });
      } else {
        displayNoProductsMessage(productList);
      }
    } else if (typeof products === 'object' && products !== null) {
      const li = createProductListItem(products);
      productList.appendChild(li);
    } else {
      displayNoProductsMessage(productList);
    }
  }
  
  function createProductListItem(product) {
    const li = document.createElement('li');
    li.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>${product.description}</p>
      <p><strong>Price:</strong> $${product.price}</p>
      <a href="detalhes.html?id=${product.id}">Details</a>
    `;
    return li;
  }
  
  function displayNoProductsMessage(container) {
    const message = document.createElement('p');
    message.textContent = 'No products found.';
    container.appendChild(message);
  }
  
  
  function createProductListItem(product) {
    const li = document.createElement('li');
    li.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>${product.description}</p>
      <p><strong>Price:</strong> $${product.price}</p>
      <a href="detalhes.html?id=${product.id}">Details</a>
    `;
    return li;
  }
  
  function displayNoProductsMessage(productList) {
    const li = document.createElement('li');
    li.textContent = 'No products found.';
    productList.appendChild(li);
  }
  
  

  function displayDetails(product) {
    const detailsSection = document.querySelector('.product-details .details');
    detailsSection.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>${product.description}</p>
      <p><strong>Price:</strong> $${product.price}</p>
      <p><strong>Category:</strong> ${product.category}</p>
      <p><strong>Rating:</strong> ${product.rating}</p>
      <p><strong>Date:</strong> ${product.date}</p>
    `;
  }
  

function displaySearchResults(products) {
  const searchResults = document.querySelector('.search-results ul');
  searchResults.innerHTML = '';
  products.forEach((product) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>${product.description}</p>
      <p><strong>Price:</strong> $${product.price}</p>
      <a href="detalhes.html?id=${product.id}">Details</a>
    `;
    searchResults.appendChild(li);
  });
}

function displayCarousel(products) {
  const carouselItems = document.querySelector('.carousel-items');
  carouselItems.innerHTML = '';
  const featuredProducts = getRandomProducts(products, 3);
  featuredProducts.forEach((product) => {
    const div = document.createElement('div');
    div.classList.add('carousel-item');
    div.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>${product.description}</p>
      <p><strong>Price:</strong> $${product.price}</p>
    `;
    carouselItems.appendChild(div);
  });
}

function getRandomProducts(products, num) {
    const shuffled = Array.from(products).sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  }
  

// Fetch products from the API
fetch('https://diwserver.vps.webdock.cloud/products')
  .then((response) => response.json())
  .then((data) => {
    // Display products on the home page
    displayProducts(data);

    // Display featured products in the carousel
    displayCarousel(data);
  });

// Fetch product details based on the URL parameter
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
if (productId) {
  fetch(`https://diwserver.vps.webdock.cloud/products/${productId}`)
    .then((response) => response.json())
    .then((data) => {
      // Display product details
      displayDetails(data);
    });
}

// Fetch search results based on the URL parameter
const searchQuery = urlParams.get('query');
if (searchQuery) {
  fetch(`https://diwserver.vps.webdock.cloud/products/search?query=${searchQuery}`)
    .then((response) => response.json())
    .then((data) => {
      // Display search results
      displaySearchResults(data);
    });
}