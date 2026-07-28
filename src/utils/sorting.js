// "$29.99" -> 29.99. Throws instead of returning NaN.
function parsePrice(text) {
  const numeric = String(text).replace(/[^0-9.]/g, "");
  const value = Number(numeric);

  if (numeric === "" || Number.isNaN(value)) {
    throw new Error(`Unable to parse a price from "${text}"`);
  }

  return value;
}

// Reports where the order first breaks.
function isSortedAscending(values) {
  for (let i = 1; i < values.length; i++) {
    if (values[i] < values[i - 1]) {
      return {
        sorted: false,
        index: i,
        previous: values[i - 1],
        current: values[i],
      };
    }
  }

  return { sorted: true };
}

module.exports = { parsePrice, isSortedAscending };
