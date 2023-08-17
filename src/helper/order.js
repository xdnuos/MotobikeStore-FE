const currentDate = new Date();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();
export function MonthRevenue(orders) {
  return orders?.reduce((total, order) => {
    const orderDate = new Date(order.orderTime);
    if (
      order.orderStatus === "SUCCESS" &&
      orderDate.getMonth() === currentMonth &&
      orderDate.getFullYear() === currentYear
    ) {
      return total + order.total;
    }
    return total;
  }, 0);
}
export function TotalRevenue(orders) {
  return orders?.reduce((total, order) => {
    if (order.orderStatus === "SUCCESS") {
      return total + order.total;
    }
    return total;
  }, 0);
}
