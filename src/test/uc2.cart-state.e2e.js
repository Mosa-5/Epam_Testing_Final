const { pages } = require("../po");
const { credentials, cartScenarios } = require("../data/inventory.data");

describe("UC-2 Cart state logic", () => {
  const loginPage = pages("login");
  const inventoryPage = pages("inventory");

  beforeEach(async () => {
    await loginPage.openFresh();
    await loginPage.login(
      credentials.standard.username,
      credentials.standard.password,
    );
    await expect(inventoryPage.title).toBeDisplayed();
    expect(await inventoryPage.getCartBadgeCount()).toEqual(0);
  });

  cartScenarios.forEach(({ title, itemsToAdd, itemToRemove }) => {
    it(`${title}: badge shows 2, then 1 after removing one`, async () => {
      const remainingItem = itemsToAdd.find((item) => item !== itemToRemove);

      for (const item of itemsToAdd) {
        await inventoryPage.addItem(item);
      }

      expect(await inventoryPage.getCartBadgeCount()).toEqual(2);

      await inventoryPage.removeItem(itemToRemove);

      expect(await inventoryPage.getCartBadgeCount()).toEqual(1);
      expect(await inventoryPage.getItemButtonLabel(itemToRemove)).toEqual(
        "Add to cart",
      );
      expect(await inventoryPage.getItemButtonLabel(remainingItem)).toEqual(
        "Remove",
      );
    });
  });
});
