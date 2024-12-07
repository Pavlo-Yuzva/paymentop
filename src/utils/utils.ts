export function generateString() {
  return Math.floor(Math.random() * Date.now()).toString(36);
}

export function generateNumber(digits = 5) {
  return Math.floor(Math.random() * 10 ** digits);
}
