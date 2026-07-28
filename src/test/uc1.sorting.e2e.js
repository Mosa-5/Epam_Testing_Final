const { pages } = require("../po");
const { credentials, sortOptions } = require("../data/inventory.data");
const { parsePrice, isSortedAscending } = require("../utils/sorting");

describe("UC-1 Inventory sorting validation", () => {
  const loginPage = pages("login");
  const inventoryPage = pages("inventory");

  before(async () => {
    await loginPage.openFresh();
    await loginPage.login(
      credentials.standard.username,
      credentials.standard.password,
    );
    await expect(inventoryPage.title).toBeDisplayed();
  });

  it(`sorts prices ascending when "${sortOptions.priceLowToHigh}" is selected`, async () => {
    await inventoryPage.sortBy(sortOptions.priceLowToHigh);
    const prices = (await inventoryPage.getAllPriceTexts()).map(parsePrice);

    expect(prices.length).toBeGreaterThan(0);
    expect(isSortedAscending(prices)).toEqual({ sorted: true });
  });
});
