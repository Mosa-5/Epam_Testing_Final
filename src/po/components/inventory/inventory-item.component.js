const BaseComponent = require("../common/base.component");

const ADD_LABEL = "Add to cart";
const REMOVE_LABEL = "Remove";

class InventoryItemComponent extends BaseComponent {
  // Anchored on the visible title so it survives re-sorting. The card class is a
  // single token so it matches exactly, the title class has a trailing space so it needs contains().
  constructor(name) {
    super(
       `//div[@class='inventory_item'][.//div[contains(@class,'inventory_item_name')][text()='${name}']]`
    );
    this.name = name;
  }

  get title() {
    return this.rootEl.$(".//div[contains(@class,'inventory_item_name')]");
  }

  get price() {
    return this.rootEl.$(".//div[@class='inventory_item_price']");
  }

  get actionButton() {
    return this.rootEl.$(".//button");
  }

  button(label) {
    return this.rootEl.$(`.//button[text()='${label}']`);
  }

  // Waiting for the label to flip proves the cart update committed.
  async addToCart() {
    const button = this.button(ADD_LABEL);
    await button.waitForClickable();
    await button.click();
    await this.button(REMOVE_LABEL).waitForDisplayed();
  }

  async remove() {
    const button = this.button(REMOVE_LABEL);
    await button.waitForClickable();
    await button.click();
    await this.button(ADD_LABEL).waitForDisplayed();
  }

  async getButtonLabel() {
    return (await this.actionButton.getText()).trim();
  }

  async getPriceText() {
    return (await this.price.getText()).trim();
  }
}

module.exports = InventoryItemComponent;
