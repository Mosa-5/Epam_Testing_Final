const credentials = {
  standard: { username: "standard_user", password: "secret_sauce" },
};

const sortOptions = {
  nameAtoZ: "Name (A to Z)",
  nameZtoA: "Name (Z to A)",
  priceLowToHigh: "Price (low to high)",
  priceHighToLow: "Price (high to low)",
};

const cartScenarios = [
  {
    title: "Backpack and Bike Light, remove Backpack",
    itemsToAdd: ["Sauce Labs Backpack", "Sauce Labs Bike Light"],
    itemToRemove: "Sauce Labs Backpack",
  },
  {
    title: "Bolt T-Shirt and Fleece Jacket, remove Fleece Jacket",
    itemsToAdd: ["Sauce Labs Bolt T-Shirt", "Sauce Labs Fleece Jacket"],
    itemToRemove: "Sauce Labs Fleece Jacket",
  },
  {
    title: "Onesie and Red T-Shirt, remove Onesie",
    itemsToAdd: ["Sauce Labs Onesie", "Test.allTheThings() T-Shirt (Red)"],
    itemToRemove: "Sauce Labs Onesie",
  },
];

module.exports = { credentials, sortOptions, cartScenarios };
