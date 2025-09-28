import "./style.css";
import { html, render } from "lit-html";
import { products, type Image, type Product } from "./store-data.js";
import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

const initialState = {
  product: products.get(1)!,
  selectedImage: 0,
  quantity: 0,
  cart: [],
  viewName: "product" as
    | "product"
    | "cart"
    | "checkout"
    | "profile"
    | "orders"
    | "settings"
    | "help"
    | "about",
};

export const store = createStore<typeof initialState>()(
  persist(() => ({ ...initialState }), { name: "store" })
);

// Simple client-side navigation
function historyChanged() {
  const { pathname, searchParams } = new URL(location.href);

  if (pathname === "/product") {
    const productId = searchParams.get("id");
    const id = productId ? parseInt(productId, 10) : 1;
    const product = products.get(id);

    if (product) {
      store.setState({ product, selectedImage: 0, viewName: "product" });
    } else {
      // Handle product not found, redirect to a valid product page
      console.warn(`Product with id ${id} not found. Redirecting.`);
      navigateTo(`/product?id=1`);
    }
  } else if (pathname === "/cart") {
    // TODO
  } else if (pathname === "/checkout") {
    // TODO
  } else if (pathname === "/profile") {
    // TODO
  } else if (pathname === "/orders") {
    // TODO
  } else if (pathname === "/settings") {
    // TODO
  } else if (pathname === "/help") {
    // TODO
  } else if (pathname === "/about") {
    // TODO
  }
}
window.addEventListener("popstate", historyChanged);

function navigateTo(href: string) {
  history.pushState(null, "", href);
  historyChanged();
}

const headerLinks = [
  { name: "Collections", href: "#" },
  { name: "Men", href: "#" },
  { name: "Women", href: "#" },
  { name: "About", href: "#" },
  { name: "Contact", href: "#" },
];

const headerHtml = () =>
  html` <header
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
          ${headerLinks.map(
            ({ name, href }) =>
              html`<li>
                <a
                  href="#"
                  @click=${(e: Event) => {
                    e.preventDefault();
                    navigateTo(href);
                  }}
                  class="hover:text-black"
                  >${name}</a
                >
              </li>`
          )}
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
  </header>`;

const productImagesHtml = (state: typeof initialState, images: Image[]) => html`
  <section class="relative md:flex md:flex-col md:gap-8">
    <div class="relative">
      <img
        src=${images[state.selectedImage].full}
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
      ${images.map(
        (image, i) => html`
          <button @click=${() => store.setState({ selectedImage: i })}>
            <img
              src=${image.thumbnail}
              alt="thumbnail"
              class="${state.selectedImage === i
                ? "ring-2 ring-orange-500 opacity-50"
                : ""} w-20 cursor-pointer rounded-lg"
            />
          </button>
        `
      )}
    </div>
  </section>
`;

const productInfoHtml = (product: Product) =>
  html` <p
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
    </div>`;

const cartHtml = (state: typeof initialState) => html`
  <div class="md:flex md:gap-4">
    <div
      class="mb-4 flex items-center justify-between rounded-lg bg-gray-100 p-4 md:w-2/5"
    >
      <button class="text-2xl font-bold text-orange-500">-</button>
      <span class="font-bold">${state.quantity}</span>
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
`;

function bodyHtml() {
  const state = store.getState();
  const product = state.product;
  return html`
    ${headerHtml()}
    <main
      class="md:mx-auto md:mt-16 md:grid md:max-w-5xl md:grid-cols-2 md:gap-24 md:px-12"
    >
      ${productImagesHtml(state, product.images)}

      <section class="p-6">
        ${productInfoHtml(product)} ${cartHtml(state)}
      </section>
    </main>
  `;
}

const renderApp = () => render(bodyHtml(), document.body);
renderApp();
store.subscribe(renderApp);
