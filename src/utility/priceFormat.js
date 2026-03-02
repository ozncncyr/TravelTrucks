export function priceFormat(price) {
  if (typeof price !== "number") return price;
  const priceStr = price.toFixed(2);
  const parts = priceStr.split(".");
  const intPart = parts[0];
  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${formattedInt},${parts[1]}`;
}
