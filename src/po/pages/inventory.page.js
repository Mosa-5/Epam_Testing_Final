const BasePage = require("./base.page");
const { HeaderComponent, InventoryItemComponent } = require("../components");

class InventoryPage extends BasePage {
  constructor() {
    super("/inventory.html");
    this.header = new HeaderComponent();
  }

  get title() {
    return $("//span[text()='Products']");
  }

  get sortDropdown() {
    return $("//select[@class='product_sort_container']");
  }

  get activeSortOption() {
    return $("//span[@class='active_option']");
  }

  get priceElements() {
    return $$("//div[@class='inventory_item_price']");
  }

  get itemNameElements() {
    return $$("//div[contains(@class,'inventory_item_name')]");
  }

  item(name) {
    return new InventoryItemComponent(name);
  }

  // React drives the select through its value property, which never reaches the
  // DOM attributes, so the active_option label is the only observable proof
  // that the sort was applied.
  async sortBy(visibleText) {
    await this.sortDropdown.waitForDisplayed();
    await this.sortDropdown.selectByVisibleText(visibleText);
    await browser.waitUntil(
      async () => (await this.activeSortOption.getText()).trim() === visibleText,
      {
        timeout: 10000,
        timeoutMsg: `Sort option did not switch to "${visibleText}"`,
      }
    );
  }

  // The collection's map() is already async and returns one promise, so it must not be wrapped in Promise.all.
  async getAllPriceTexts() {
    const texts = await this.priceElements.map((el) => el.getText());
    return texts.map((text) => text.trim());
  }

  async getAllItemNames() {
    const texts = await this.itemNameElements.map((el) => el.getText());
    return texts.map((text) => text.trim());
  }

  async addItem(name) {
    await this.item(name).addToCart();
  }

  async removeItem(name) {
    await this.item(name).remove();
  }

  async getItemButtonLabel(name) {
    return this.item(name).getButtonLabel();
  }

  async getCartBadgeCount() {
    return this.header.getCartBadgeCount();
  }
}

module.exports = InventoryPage;
