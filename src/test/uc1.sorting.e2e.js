const { pages } = require("../po");
const { credentials, sortOptions } = require("../data/inventory.data");
const { parsePrice, isSortedAscending } = require("../utils/sorting");

describe("UC-1 Inventory sorting validation", () => {
  const loginPage = pages("login");
  const inventoryPage = pages("inventory");

  it(`Given a logged in user, When sorting by "${sortOptions.priceLowToHigh}", Then all prices are in ascending order`, async () => {
    // Given a logged in user on the inventory page
    await loginPage.openFresh();
    await loginPage.login(
      credentials.standard.username,
      credentials.standard.password,
    );
    await expect(inventoryPage.title).toBeDisplayed();

    // When the price low to high sort is applied
    await inventoryPage.sortBy(sortOptions.priceLowToHigh);

    // Then every rendered price is greater than or equal to the one before it
    const prices = (await inventoryPage.getAllPriceTexts()).map(parsePrice);

    expect(prices.length).toBeGreaterThan(0);
    expect(isSortedAscending(prices)).toEqual({ sorted: true });
  });
});
