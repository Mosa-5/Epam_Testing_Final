# "Inventory Logic" Flow

Focus: Data validation, sorting algorithms, and state management.

Launch URL: https://www.saucedemo.com/

## Task description

### UC-1 Sorting Validation

- Login with standard_user.
- Select "Price (low to high)" from the sort dropdown.
- Validation: Scrape the prices of all items on the page and programmatically verify that the array is sorted correctly in ascending order.

### UC-2 Cart State Logic

- Add two different items to the cart.
- Verify the cart badge shows "2".
- Remove one item via the "Remove" button on the Inventory page.
- Verify the cart badge updates to "1".

### Technical Requirements

- Tool: WebDriverIO.
- Browsers: Firefox, Edge (Run in Parallel).
- Pattern: Page Object Model (POM).
- Locators: XPath (Focus on text-based selection).
- Parametrization: Use Data Provider for the items being added/removed.
- Documentation: Add a README.md explaining the sorting validation logic.

## Setup

```bash
npm install
```

Firefox and Microsoft Edge must be installed. WebdriverIO v9 manages the drivers.

## Running

```bash
npm test              # Firefox + Edge in parallel, headless
npm run test:headed   # same, with visible windows
npm run test:firefox
npm run test:edge
```

Expected: 4 spec files, 8 tests. 1 from UC-1 and 3 from UC-2 per browser.

## UC-1 sorting validation logic

Validation runs against the rendered DOM, not against the dropdown's selected
value. Three steps.

**1. Sort and wait.** `sortBy()` picks the option by visible text, then waits
for the page's `active_option` label to read back that text. React drives the
`<select>` through its value property, so no option ever gains a `selected`
attribute. That label is the only proof the sort was applied.

**2. Scrape and parse.** Prices are read in render order and passed through
`parsePrice()`, which strips everything that is not a digit or a decimal point.
It throws on unparseable input, so a markup change fails loudly instead of
producing `NaN`.

```js
parsePrice("$29.99")  // 29.99
parsePrice("n/a")     // throws
```

**3. Check the order.** `isSortedAscending()` makes one pass, comparing each
price to the one before it:

```js
for (let i = 1; i < values.length; i++) {
  if (values[i] < values[i - 1]) {
    return { sorted: false, index: i, previous: values[i - 1], current: values[i] };
  }
}
return { sorted: true };
```

It starts at index 1 because index 0 has no predecessor, and uses `<` rather
than `<=` so equal neighbours pass. Two products both cost $15.99.

The spec asserts the whole returned object so the failure names the offending
pair instead of reporting `expected true, received false`:

```js
expect(isSortedAscending(prices)).toEqual({ sorted: true });
// fails with: { sorted: false, index: 1, previous: 49.99, current: 29.99 }
```

## UC-2 cart state logic

`cartScenarios` holds three datasets. The spec iterates them at load time, so
each becomes its own registered test with its own name, its own `beforeEach`,
and no dependency on the others.

**Zero has no node.** The badge element is unmounted when the cart is empty
rather than rendering "0", so a missing element maps to `0`.

**Session and cart are stored separately.** The session is a cookie, the cart is
`localStorage`. Clearing cookies alone logs the user out but leaves the cart
full, so the next dataset would start at 1 instead of 0. `openFresh()` clears
both.

**The button label is the sync point.** Adding and removing wait for the card's
button to flip between `Add to cart` and `Remove`. That flip is the proof the
state change committed, which makes the badge assertion race free without a
fixed sleep.

Each test also checks both final button labels, so the cart is verified through
two signals rather than the counter alone.
