const LoginPage = require("./login.page");
const InventoryPage = require("./inventory.page");

function pages(name) {
  const items = {
    login: new LoginPage(),
    inventory: new InventoryPage(),
  };

  return items[name.toLowerCase()];
}

module.exports = {
  LoginPage,
  InventoryPage,
  pages,
};
