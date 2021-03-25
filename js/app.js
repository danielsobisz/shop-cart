const cartIcon = document.querySelector(".js-shop-cart-icon");
const backIcon = document.querySelector(".js-back-icon");

const cartPanel = document.querySelector(".js-cart-panel");
const productsSection = document.querySelector(".js-products-section");

let products = [];
let cart = [];

class Products {
  async getProducts() {
    try {
      await fetch("../data/products.json")
        .then((response) => response.json())
        .then((json) => {
          products = json.products;
          return products;
        });
    } catch (error) {
      console.log(error);
    }
  }
}

class UI {
  displayProducts() {
    const productsContainer = document.createElement("div");
    productsContainer.classList.add("c-products");

    const productsList = products.map((product) => {
      return `
            <div class="c-product">
                    <figure class="o-wrapper o-wrapper--th-1">
                      <img
                        src="${product.pic}"
                        alt="${product.name}"
                        class="o-image o-image--center"
                      />
                    </figure>
                    <div class="c-product__description">
                      <p class="c-product__name">${product.name}</p>
                      <p class="c-product__price">${product.price}</p>
                    </div>
                    <a href="" class="c-btn js-product-btn" data-id=${product.id}>
                      <span class="c-btn__wrap">
                        <span class="c-btn__label">i want it!</span>
                      </span>
                    </a>
                  </div>
           `;
    });
    productsContainer.innerHTML = productsList.join("");
    productsSection.childNodes[1].append(productsContainer);
  }

  getProductsBtns() {
    const btns = [...document.querySelectorAll(".js-product-btn")];

    btns.forEach((btn) => {
      let id = btn.dataset.id;
      let inCart = cart.find((item) => item.id - 1 === id - 1);

      btn.addEventListener("click", (e) => {
        e.preventDefault();

        let cartItem = { ...Storage.getProduct(id), amount: 1 };
        cart = [...cart, cartItem];

        Storage.saveCart(cart);
        this.addCartItem(cartItem);
      });
    });
  }
  addCartItem(item) {
    const div = document.createElement("div");
    div.classList.add("c-cart-item");
    div.innerHTML = `
    <img src="${item.pic}" class="c-cart-item__pic"/>
    <div class="c-cart-item__description">
    <p class="c-cart-item__name">${item.name}</p>
    <p class="c-cart-item__price">${item.price}</p>
     <p class="c-cart-item__amount">
     <i class="c-cart-item__quanity-btn fas fa-minus js-amount-btn" data-type="decrease"></i>
     Quanity: ${item.amount}
     <i class="c-cart-item__quanity-btn fas fa-plus js-amount-btn" data-type="increase"></i>
     </p>
    </div>
    `;
    cartPanel.appendChild(div);
  }

  showCart() {
    cartPanel.classList.add("isActive");
  }

  hideCart() {
    cartPanel.classList.remove("isActive");
  }

  setupApp() {
    cart = Storage.getCart();

    cartIcon.addEventListener("click", this.showCart);
    backIcon.addEventListener("click", this.hideCart);
  }
}

class Storage {
  static saveProducts() {
    localStorage.setItem("products", JSON.stringify(products));
  }

  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    return products.find((product) => product.id - 1 === id - 1);
  }

  static saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  static getCart() {
    return localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const products = new Products();
  const ui = new UI();

  ui.setupApp();

  products
    .getProducts()
    .then((products) => {
      ui.displayProducts(products);
      Storage.saveProducts(products);
    })
    .then(() => {
      ui.getProductsBtns();
    });
});
