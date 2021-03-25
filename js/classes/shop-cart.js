export default class ShopCart {
  constructor() {
    this.$basketIcon = document.querySelector(".js-shop-cart-icon");
    this.$backIcon = document.querySelector(".js-back-icon");
    this.$panel = document.querySelector(".js-panel");
  }

  // async fetchItems() {
  //   let apiUrl = "../data/products.json";

  //   const response = await fetch(apiUrl);
  //   const json = await response.json();
  //   this.$data = json;
  //   console.log(this.$data);
  // }

  // showItems() {

  //   const productsContainer = document
  //     .createElement("div")
  //     .classList.add(".c-products");
  //   productsContainer.innerHTML = `
  //       ${this.products.map((product) => {
  //         `
  //           <div class="c-product">
  //           <figure class="o-wrapper o-wrapper--th-1">
  //             <img
  //               src="${product.pic}"
  //               alt="coffee bag"
  //               class="o-image o-image--center"
  //             />
  //           </figure>
  //           <div class="c-product__description">
  //             <p class="c-product__name">${product.name}</p>
  //             <p class="c-product__price">${product.price}</p>
  //           </div>
  //           <a href="" class="c-btn">
  //             <span class="c-btn__wrap">
  //               <span class="c-btn__label">i want it!</span>
  //             </span>
  //           </a>
  //         </div>
  //           `;
  //       })}
  //       `;
  //   this.$main.append(productsContainer);
  // }

  showPanel() {
    this.$panel.classList.add("isActive");
  }

  hidePanel() {
    this.$panel.classList.remove("isActive");
  }

  init() {
    this.$basketIcon.addEventListener("click", () => {
      this.showPanel();
    });
    this.$backIcon.addEventListener("click", () => {
      this.hidePanel();
    });
  }
}
