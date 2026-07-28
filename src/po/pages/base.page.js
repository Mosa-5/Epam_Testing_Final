class BasePage {
  constructor(url) {
    this.url = url;
  }

  open() {
    return browser.url(this.url);
  }

  // Navigate first, storage can only be cleared for the loaded domain.
  // The session lives in a cookie and the cart in localStorage, so both go.
  async openFresh() {
    await this.open();
    await browser.deleteCookies();
    await browser.execute(() => window.localStorage.clear());
    await this.open();
  }
}

module.exports = BasePage;
