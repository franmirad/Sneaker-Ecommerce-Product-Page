/*//----------------------------------------// CART //----------------------------------------//*/
const cartButton = document.querySelector('[data-component="cart-button"]');
const cart = document.querySelector('[data-component="cart"]');

cartButton.addEventListener("click", () => {
  cart.classList.toggle("active");
});

/*//----------------------------------------// SIDENAV //----------------------------------------//*/
const menuOpenButton = document.querySelector('[data-component="menu-open-button"]');
const menuCloseButton = document.querySelector('[data-component="menu-close-button"]');
const sidenav = document.querySelector('[data-component="sidenav"]');
const darkOverlay = document.querySelector(".dark-overlay");

menuOpenButton.addEventListener("click", () => {
  sidenav.classList.add("active");
  darkOverlay.classList.add("active");
});

menuCloseButton.addEventListener("click", () => {
  sidenav.classList.remove("active");
  darkOverlay.classList.remove("active");
});

/*//----------------------------------------// GALLERY SLIDER //----------------------------------------//*/
const gallerySlider = new Swiper(".gallery-slider", {
  loop: true,
  speed: 500,
  spaceBetween: 20,
  loopedSlides: 4,
});

const gallerySliderThumbnails = new Swiper(".gallery-slider-thumbnails", {
  loop: true,
  speed: 500,
  slidesPerView: 4,
  spaceBetween: 20,
  loopedSlides: 4,
  touchRatio: 0.2,
  slideToClickedSlide: true,
});

gallerySlider.controller.control = gallerySliderThumbnails;
gallerySliderThumbnails.controller.control = gallerySlider;

/*//----------------------------------------// LIGHTBOX //----------------------------------------//*/
const lightboxSlider = new Swiper(".lightbox-slider", {
  loop: true,
  speed: 500,
  spaceBetween: 20,
  loopedSlides: 4,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const lightboxSliderThumbnails = new Swiper(".lightbox-slider-thumbnails", {
  loop: true,
  speed: 500,
  slidesPerView: 4,
  spaceBetween: 20,
  loopedSlides: 4,
  touchRatio: 0.2,
  slideToClickedSlide: true,
});

lightboxSlider.controller.control = lightboxSliderThumbnails;
lightboxSliderThumbnails.controller.control = lightboxSlider;

const gallerySliderSlides = document.querySelectorAll(".gallery-slider > .swiper-wrapper > .swiper-slide");
const lightbox = document.querySelector(".lightbox");
const lightboxCloseButton = document.querySelector('[data-component="lightbox-close-button"]');

gallerySliderSlides.forEach(item => {
  item.addEventListener("click", () => {
    lightbox.classList.add("active");
  });
});

lightboxCloseButton.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

/*//----------------------------------------// PRODUCT COUNTER //----------------------------------------//*/
const addOneButton = document.querySelector(".add-one-button");
const restOneButton = document.querySelector(".rest-one-button");
const productQuantity = document.querySelector("#product-quantity");
let productQuantityValue = parseInt(productQuantity.innerText, 10);

addOneButton.addEventListener("click", () => {
  productQuantityValue = productQuantityValue + 1;
  productQuantity.innerText = productQuantityValue;
});

restOneButton.addEventListener("click", () => {
  if (!productQuantityValue == 0) {
    productQuantityValue = productQuantityValue - 1;
    productQuantity.innerText = productQuantityValue;
  }
});

/*//----------------------------------------// ADD PRODUCT //----------------------------------------//*/
const addProductButton = document.querySelector(".add-product-button");
const checkoutButton = document.querySelector(".checkout-button");
const cartItems = document.querySelector("#cart-items");

addProductButton.addEventListener("click", () => {
  const product = {
    thumbnail: "assets/images/image-product-1-thumbnail.jpg",
    name: "Fall Limited Edition Sneakers",
    price: 125.00,
    quantity: productQuantityValue,
  };

  let cartProduct = `
    <div class="cart-product" data-component="cart-product">
      <img src="${product.thumbnail}" alt="Product Thumbnail">
      <div>
        <span class="asd">
          ${product.name}
        </span>
        <span>
          <span>
            ${"$" + product.price + " x " + product.quantity}
          </span>
          <strong>
            ${"$" + product.price * product.quantity}
          </strong>
        </span>
      </div>
      <button class="delete-product-button">
        <img src="assets/icons/icon-delete.svg" alt="Delete Product">
      </button>
    </div>
  `;

  if (!productQuantityValue == 0) {
    cartItems.removeChild(cartItems.children[0]);
    cartItems.insertAdjacentHTML("afterbegin", cartProduct);
    checkoutButton.classList.add("active");
    cart.classList.add("active");
  }

  cartButton.dataset.totalItems = product.quantity;

  /*//----------------------------------------// DELETE PRODUCT //----------------------------------------//*/
  const deleteProductButton = document.querySelector('.delete-product-button');

  deleteProductButton.addEventListener("click", () => {
    let emptyCartLabel = `
      <span class="empty-cart-label">
        Your cart is empty
      </span>
    `;

    deleteProductButton.parentElement.classList.add("deleted");
    setTimeout(function () {
      cartItems.removeChild(cartItems.children[0]);
      cartItems.insertAdjacentHTML("afterbegin", emptyCartLabel);
      checkoutButton.classList.remove("active");
    }, 600);

    cartButton.dataset.totalItems = product.quantity;
  });
});