import "./style.css";
import { html, render } from "lit-html";

// Note: In a real application, you would likely fetch product data from an API.
// For this challenge, we'll use static data.
const product = {
  name: "Fall Limited Edition Sneakers",
  company: "Sneaker Company",
  description:
    "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.",
  price: 250.0,
  discount: 0.5,
  get finalPrice() {
    return this.price * this.discount;
  },
};

function renderBody() {
  render(
    html`
      <header
        class="flex items-center justify-between p-6 md:mx-auto md:max-w-6xl md:border-b md:pb-0"
      >
        <div class="flex items-center gap-4">
          <button class="md:hidden">
            <img src="./images/icon-menu.svg" alt="Menu" />
          </button>
          <a href="/">
            <img src="./images/logo.svg" alt="sneakers" />
          </a>
          <nav class="ml-8 hidden md:block">
            <ul class="flex gap-8 text-gray-500">
              <li><a href="#" class="hover:text-black">Collections</a></li>
              <li><a href="#" class="hover:text-black">Men</a></li>
              <li><a href="#" class="hover:text-black">Women</a></li>
              <li><a href="#" class="hover:text-black">About</a></li>
              <li><a href="#" class="hover:text-black">Contact</a></li>
            </ul>
          </nav>
        </div>
        <div class="flex items-center gap-6">
          <button>
            <img src="./images/icon-cart.svg" alt="Cart" />
          </button>
          <button>
            <img class="h-8 w-8" src="./images/image-avatar.png" alt="Avatar" />
          </button>
        </div>
      </header>

      <main
        class="md:mx-auto md:mt-16 md:grid md:max-w-5xl md:grid-cols-2 md:gap-24 md:px-12"
      >
        <section class="relative md:flex md:flex-col md:gap-8">
          <div class="relative">
            <img
              src="./images/image-product-1.jpg"
              alt="Fall Limited Edition Sneakers"
              class="h-80 w-full object-cover md:h-auto md:rounded-2xl"
            />
            <div
              class="absolute top-1/2 flex w-full -translate-y-1/2 justify-between px-4 md:hidden"
            >
              <button
                class="flex h-10 w-10 items-center justify-center rounded-full bg-white"
              >
                <img src="./images/icon-previous.svg" alt="Previous" />
              </button>
              <button
                class="flex h-10 w-10 items-center justify-center rounded-full bg-white"
              >
                <img src="./images/icon-next.svg" alt="Next" />
              </button>
            </div>
          </div>
          <div class="hidden justify-between md:flex">
            <img
              src="./images/image-product-1-thumbnail.jpg"
              alt="thumbnail"
              class="w-20 cursor-pointer rounded-lg"
            />
            <img
              src="./images/image-product-2-thumbnail.jpg"
              alt="thumbnail"
              class="w-20 cursor-pointer rounded-lg"
            />
            <img
              src="./images/image-product-3-thumbnail.jpg"
              alt="thumbnail"
              class="w-20 cursor-pointer rounded-lg"
            />
            <img
              src="./images/image-product-4-thumbnail.jpg"
              alt="thumbnail"
              class="w-20 cursor-pointer rounded-lg"
            />
          </div>
        </section>

        <section class="p-6">
          <p
            class="mb-4 text-sm font-bold tracking-wider text-orange-500 uppercase"
          >
            ${product.company}
          </p>
          <h1 class="mb-4 text-3xl font-bold md:text-4xl">${product.name}</h1>
          <p class="mb-6 text-gray-500">${product.description}</p>

          <div
            class="mb-6 flex items-center justify-between md:flex-col md:items-start"
          >
            <div class="flex items-center gap-4">
              <span class="text-3xl font-bold"
                >$${product.finalPrice.toFixed(2)}</span
              >
              <span
                class="rounded-md bg-orange-100 px-2 py-1 font-bold text-orange-500"
                >${product.discount * 100}%</span
              >
            </div>
            <span class="font-bold text-gray-400 line-through"
              >$${product.price.toFixed(2)}</span
            >
          </div>

          <div class="md:flex md:gap-4">
            <div
              class="mb-4 flex items-center justify-between rounded-lg bg-gray-100 p-4 md:w-2/5"
            >
              <button class="text-2xl font-bold text-orange-500">-</button>
              <span class="font-bold">0</span>
              <button class="text-2xl font-bold text-orange-500">+</button>
            </div>

            <button
              class="w-full rounded-lg bg-orange-500 py-4 font-bold text-white shadow-lg shadow-orange-200 md:w-3/5"
            >
              <span class="flex items-center justify-center gap-4">
                <img src="./images/icon-cart-white.svg" alt="" />
                Add to cart
              </span>
            </button>
          </div>
        </section>
      </main>
    `,
    document.body
  );
}

renderBody();
window.addEventListener("click", renderBody);
window.addEventListener("hashchange", renderBody);
