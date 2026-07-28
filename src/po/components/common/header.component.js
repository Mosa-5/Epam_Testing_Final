const BaseComponent = require("./base.component");

class HeaderComponent extends BaseComponent {
  constructor() {
    super("//div[@class='primary_header']");
  }

  get cartLink() {
    return this.rootEl.$(".//a[@class='shopping_cart_link']");
  }

  get cartBadge() {
    return this.rootEl.$(".//span[@class='shopping_cart_badge']");
  }

  // SauceDemo removes the badge node when the cart is empty instead of showing "0".
  async getCartBadgeCount() {
    if (!(await this.cartBadge.isExisting())) {
      return 0;
    }

    return Number((await this.cartBadge.getText()).trim());
  }

  async openCart() {
    await this.cartLink.click();
  }
}

module.exports = HeaderComponent;
