class BaseComponent {
  constructor(rootSelector) {
    this.rootSelector = rootSelector;
  }

  get rootEl() {
    return $(this.rootSelector);
  }

  async isDisplayed() {
    return this.rootEl.isDisplayed();
  }
}

module.exports = BaseComponent;
