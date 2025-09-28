import "./style.css";
import { html, render } from "lit-html";
import { products, type Image, type Product } from "./store-data.js";
import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

const initialState = {
  product: products.get(1)!,
  selectedImage: 0,
  quantity: 0,
  cart: [] as (Product & { quantity: number })[],
  cartOpen: false,
  viewName: "product" as
    | "product"
    | "cart"
    | "checkout"
    | "profile"
    | "orders"
    | "settings"
    | "help"
    | "about"
    | "men"
    | "women",
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
  } else if (pathname === "/men") {
    store.setState({ viewName: "men" });
  } else if (pathname === "/women") {
    store.setState({ viewName: "women" });
  }
}
window.addEventListener("popstate", historyChanged);

function navigateTo(href: string) {
  history.pushState(null, "", href);
  historyChanged();
}

const headerLinks = [
  { name: "Collections", href: "#" },
  { name: "Men", href: "/men" },
  { name: "Women", href: "/women" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "#" },
];

const cartDropdownHtml = (state: typeof initialState) =>
  !state.cartOpen
    ? html``
    : html`
        <div
          class="${state.cartOpen
            ? ""
            : "hidden"} absolute top-20 right-0 z-10 w-80 rounded-lg bg-white shadow-xl"
        >
          <h3 class="border-b p-4 font-bold">Cart</h3>
          ${state.cart.length === 0
            ? html`<p class="p-16 text-center font-bold text-gray-500">
                Your cart is empty.
              </p>`
            : html`
                <div class="p-4">
                  ${state.cart.map(
                    item => html`
                      <div class="flex items-center justify-between">
                        <img
                          src=${item.images[0].thumbnail}
                          alt=${item.name}
                          class="h-12 w-12 rounded"
                        />
                        <div>
                          <p>${item.name}</p>
                          <p>
                            ${item.finalPrice.toFixed(2)} x ${item.quantity}
                            <span class="font-bold"
                              >${(item.finalPrice * item.quantity).toFixed(
                                2
                              )}</span
                            >
                          </p>
                        </div>
                        <button
                          @click=${() => {
                            const newCart = state.cart.filter(
                              cartItem => cartItem.id !== item.id
                            );
                            store.setState({ cart: newCart });
                          }}
                        >
                          <img src="./images/icon-delete.svg" alt="Delete" />
                        </button>
                      </div>
                    `
                  )}
                  <button
                    class="mt-4 w-full rounded-lg bg-orange-500 py-4 font-bold text-white"
                  >
                    Checkout
                  </button>
                </div>
              `}
        </div>
      `;

const headerHtml = () => {
  const state = store.getState();
  return html` <header
    class="flex items-center justify-between p-6 md:mx-auto md:max-w-6xl md:border-b md:border-gray-200 md:pb-0"
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
              html`<li class="flex">
                <a
                  href="#"
                  @click=${(e: Event) => {
                    e.preventDefault();
                    navigateTo(href);
                  }}
                  class="border-b-4 border-transparent py-8 hover:border-orange-500 hover:text-black"
                  >${name}</a
                >
              </li>`
          )}
        </ul>
      </nav>
    </div>
    <div class="relative flex items-center gap-6">
      <button @click=${() => store.setState({ cartOpen: !state.cartOpen })}>
        <img src="./images/icon-cart.svg" alt="Cart" />
      </button>
      ${cartDropdownHtml(state)}
      <button class="rounded-full hover:ring-2 hover:ring-orange-500">
        <img class="h-12 w-12" src="./images/image-avatar.png" alt="Avatar" />
      </button>
    </div>
  </header>`;
};

const productImagesHtml = (state: typeof initialState, images: Image[]) => html`
  <section class="relative md:flex md:flex-col md:gap-8">
    <div class="relative">
      <img
        src=${images[state.selectedImage].full}
        alt=${state.product.name}
        class="h-80 w-full object-cover md:h-auto md:rounded-2xl"
      />
      <div
        class="absolute top-1/2 flex w-full -translate-y-1/2 justify-between px-4 md:hidden"
      >
        <button
          class="flex h-10 w-10 items-center justify-center rounded-full bg-white"
          @click=${() =>
            store.setState({
              selectedImage:
                (state.selectedImage + images.length - 1) % images.length,
            })}
        >
          <img src="./images/icon-previous.svg" alt="Previous" />
        </button>
        <button
          class="flex h-10 w-10 items-center justify-center rounded-full bg-white"
          @click=${() =>
            store.setState({
              selectedImage: (state.selectedImage + 1) % images.length,
            })}
        >
          <img src="./images/icon-next.svg" alt="Next" />
        </button>
      </div>
    </div>
    <div class="hidden justify-between md:flex">
      ${images.map(
        (image, i) => html`
          <button
            @click=${() => store.setState({ selectedImage: i })}
            class="rounded-lg hover:opacity-75"
          >
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
      class="mb-4 text-sm font-bold tracking-wider text-gray-500 uppercase"
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
        <span class="rounded-md bg-black px-2 py-0 font-bold text-white"
          >${product.discount * 100}%</span
        >
      </div>
      <span class="font-bold text-gray-400 line-through"
        >$${product.price.toFixed(2)}</span
      >
    </div>`;

const orderControlHtml = (state: typeof initialState) => html`
  <div class="flex flex-col gap-4 md:flex-row">
    <div
      class="flex items-center justify-between rounded-lg bg-gray-100 px-3 py-3 md:w-2/5 md:py-0"
    >
      <button
        class="text-2xl font-bold text-orange-500"
        @click=${() =>
          store.setState({ quantity: Math.max(0, state.quantity - 1) })}
      >
        -
      </button>
      <span class="font-bold">${state.quantity}</span>
      <button
        class="text-2xl font-bold text-orange-500"
        @click=${() => store.setState({ quantity: state.quantity + 1 })}
      >
        +
      </button>
    </div>

    <button
      class="w-full rounded-lg bg-orange-500 py-3 font-semibold text-black shadow-lg shadow-orange-200 hover:opacity-75 md:w-3/5"
      @click=${() => {
        if (state.quantity === 0) return;
        const itemInCart = state.cart.find(
          item => item.id === state.product.id
        );
        if (itemInCart) {
          const newCart = state.cart.map(item =>
            item.id === state.product.id
              ? { ...item, quantity: item.quantity + state.quantity }
              : item
          );
          store.setState({ cart: newCart, quantity: 0 });
        } else {
          const newCart = [
            ...state.cart,
            { ...state.product, quantity: state.quantity },
          ];
          store.setState({ cart: newCart, quantity: 0 });
        }
      }}
    >
      <span class="flex items-center justify-center gap-4">
        <img
          src="./images/icon-cart.svg"
          alt=""
          class="brightness-0 group-hover:brightness-100"
        />
        Add to cart
      </span>
    </button>
  </div>
`;

const productListPageHtml = (tag: string) => {
  const filteredProducts = [...products.values()].filter(product =>
    product.tags.includes(tag)
  );
  return html`
    <div class="grid grid-cols-1 gap-8 p-6 md:mx-auto md:max-w-5xl">
      ${filteredProducts.map(
        product => html`
          <div class="rounded-lg border shadow-lg">
            <a
              class="flex"
              href=${`/product?id=${product.id}`}
              @click=${(e: Event) => {
                e.preventDefault();
                navigateTo(`/product?id=${product.id}`);
              }}
            >
              <img
                src=${product.images[0].full}
                alt=${product.name}
                class="h-30 rounded-t-lg object-cover"
              />
              <div class="p-4">
                <h2 class="text-xl font-bold">${product.name}</h2>
                <p class="text-gray-500">${product.company}</p>
              </div>
            </a>
          </div>
        `
      )}
    </div>
  `;
};

const productHtml = (state: typeof initialState, product: Product) => html`
  <main
    class="md:mx-auto md:mt-16 md:grid md:max-w-5xl md:grid-cols-2 md:gap-24 md:px-12"
  >
    ${productImagesHtml(state, product.images)}
    <section class="p-6">
      ${productInfoHtml(product)} ${orderControlHtml(state)}
    </section>
  </main>
`;

function mainContentHtml(state: typeof initialState) {
  switch (state.viewName) {
    case "men":
      return productListPageHtml("men");
    case "women":
      return productListPageHtml("women");
    case "product":
    default:
      return productHtml(state, state.product);
  }
}

const renderApp = () =>
  render([headerHtml(), mainContentHtml(store.getState())], document.body);
renderApp();
store.subscribe(renderApp);
