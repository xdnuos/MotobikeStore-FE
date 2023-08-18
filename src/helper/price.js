export function formatCurrencyVND(price) {
  return price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
}
