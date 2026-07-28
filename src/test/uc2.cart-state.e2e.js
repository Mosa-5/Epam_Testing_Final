const { pages } = require("../po");
const { credentials, cartScenarios } = require("../data/inventory.data");

describe("UC-2 Cart state logic", () => {
  const loginPage = pages("login");
  const inventoryPage = pages("inventory");

  // Given a logged in user with an empty cart
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
    it(`Given an empty cart, When "${title}", Then the badge shows 2 then 1`, async () => {
      const remainingItem = itemsToAdd.find((item) => item !== itemToRemove);

      // When two different items are added
      for (const item of itemsToAdd) {
        await inventoryPage.addItem(item);
      }

      // Then the badge shows 2
      expect(await inventoryPage.getCartBadgeCount()).toEqual(2);

      // When one item is removed from the inventory page
      await inventoryPage.removeItem(itemToRemove);

      // Then the badge shows 1 and the buttons reflect the cart
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
