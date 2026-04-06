const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

// ------ DYNAMIC PRODUCT PAGE LOGIC ------

// Function called when a product card is clicked
function selectProduct(element) {
    // Collect data from the clicked product element
    const img = element.querySelector('img').src;
    const brand = element.querySelector('.des span').innerText;
    const name = element.querySelector('.des h5').innerText;
    const price = element.querySelector('.des h4').innerText;

    // Save product object to sessionStorage
    const product = {
        img: img,
        brand: brand,
        name: name,
        price: price
    };
    sessionStorage.setItem('selectedProduct', JSON.stringify(product));

    // Redirect to the single product page
    window.location.href = 'sproduct.html';
}

// Function to populate the single product page on load
function loadProductDetails() {
    const productData = sessionStorage.getItem('selectedProduct');
    if (!productData || !document.getElementById('pro-name')) return;

    const product = JSON.parse(productData);

    // Update the main page elements
    const mainImg = document.getElementById('MainImg');
    const proName = document.getElementById('pro-name');
    const proCategory = document.getElementById('pro-category');
    const proPrice = document.getElementById('pro-price');

    if (mainImg) mainImg.src = product.img;
    if (proName) proName.innerText = product.name;
    if (proCategory) proCategory.innerText = `Home / ${product.brand}`;
    if (proPrice) proPrice.innerText = product.price;

    // --- Interactive Gallery Logic ---
    // If the image follows the pattern img/products/f1.jpg, we can guess the thumbnails
    const smallImgs = document.getElementsByClassName('small-img');
    const currentImgPath = product.img;
    const pathParts = currentImgPath.split('/');
    const fileName = pathParts[pathParts.length - 1]; // e.g. f1.jpg or n1.jpg
    const baseName = fileName.split('.')[0][0]; // e.g. "f" or "n"

    // Set thumbnails based on naming convention (assuming f1-f4 and n1-n4 exist)
    for (let i = 0; i < smallImgs.length; i++) {
        // Try to generate a gallery if it follows fX.jpg or nX.jpg format
        // Otherwise just use the current image as the gallery base
        const thumbNum = i + 1;
        const newImgSrc = currentImgPath.replace(fileName, `${baseName}${thumbNum}.jpg`);
        
        smallImgs[i].src = newImgSrc;

        // Add click behavior to swap main image
        smallImgs[i].onclick = function () {
            mainImg.src = smallImgs[i].src;
        };
    }
}

// Run loadProductDetails if we are on the sproduct.html page
window.onload = function() {
    loadProductDetails();
};