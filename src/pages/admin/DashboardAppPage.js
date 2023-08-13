import { Helmet } from "react-helmet-async";
import { faker } from "@faker-js/faker";
// @mui
import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography } from "@mui/material";
// components
import Iconify from "../../components/iconify";
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from "../../sections/@dashboard/app";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { orderService } from "src/services/orderService";

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const currentDate = new Date();
  const oneDay = 24 * 60 * 60 * 1000;
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const products = useSelector(
    (state) => state.products.productList.allProduct
  );
  const generateLabels = (numLabels, daysApart) => {
    const labels = [];
    const currentDate = new Date();

    for (let i = 0; i < numLabels; i++) {
      const newDate = new Date(currentDate);
      newDate.setDate(newDate.getDate() - i * daysApart);
      labels.push(newDate.toLocaleDateString());
    }

    return labels;
  };
  const chartLabels = generateLabels(10, 3);
  const [orders, setOrders] = useState([]);

  const getAllOrder = async () => {
    return new Promise((resolve, reject) => {
      orderService
        .getAllOrdersAdmin()
        .then((response) => {
          setOrders(response);
          console.log("response", response);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  useEffect(() => {
    getAllOrder();
  }, []);

  const sevenDaysAgo = new Date(currentDate.getTime() - 7 * oneDay);

  const totalQuantitySoldLast7Days = orders.reduce((total, order) => {
    if (
      order.orderStatus === "SUCCESS" &&
      new Date(order.orderTime) >= sevenDaysAgo
    ) {
      return (
        total +
        order.orderItems.reduce((subTotal, item) => subTotal + item.quantity, 0)
      );
    }
    return total;
  }, 0);

  const oneWeekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);

  const revenueLastWeek = orders.reduce((total, order) => {
    if (
      order.orderStatus === "SUCCESS" &&
      new Date(order.orderTime) >= oneWeekAgo
    ) {
      return total + order.total;
    }
    return total;
  }, 0);

  const thirtyDaysAgo = new Date(currentDate.getTime() - 30 * oneDay);

  const revenuesLast30Days = [];
  for (let i = 0; i < 10; i++) {
    const endDate = new Date(thirtyDaysAgo.getTime() + (i + 1) * 3 * oneDay);
    const startDate = new Date(endDate.getTime() - 3 * oneDay);

    const revenue = orders.reduce((total, order) => {
      if (
        order.orderStatus === "SUCCESS" &&
        new Date(order.orderTime) >= startDate &&
        new Date(order.orderTime) <= endDate
      ) {
        return total + order.total;
      }
      return total;
    }, 0);

    revenuesLast30Days.push(revenue);
  }

  const chartData = [
    {
      name: "Revenue",
      type: "area",
      fill: "gradient",
      data: revenuesLast30Days,
    },
  ];

  const latestOrders = orders
    .filter((order) => order.orderStatus === "SUCCESS")
    .sort((a, b) => new Date(b.orderTime) - new Date(a.orderTime))
    .slice(0, 5);

  const currentMonthRevenue = orders.reduce((total, order) => {
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

  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  const lastMonthRevenue = orders.reduce((total, order) => {
    const orderDate = new Date(order.orderTime);
    if (
      order.orderStatus === "SUCCESS" &&
      orderDate.getMonth() === lastMonth &&
      orderDate.getFullYear() === lastMonthYear
    ) {
      return total + order.total;
    }
    return total;
  }, 0);

  let revenueRatio = 0;
  if (lastMonthRevenue === 0) {
    revenueRatio = 100;
  } else {
    revenueRatio = currentMonthRevenue / lastMonthRevenue;
  }
  const formattedLatestOrders = latestOrders.map((order, index) => ({
    id: order.orderID,
    title: `Order #${order.orderID} from ${new Date(
      order.orderTime
    ).toLocaleDateString()}, ${order.total.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    })}`,
    type: `order${index + 1}`,
    time: new Date(order.orderTime),
  }));
  const newestCreatedProducts = [];
  for (const product of products) {
    if (newestCreatedProducts.length < 5) {
      newestCreatedProducts.push(product);
    } else {
      const oldestNewestProduct = newestCreatedProducts.reduce((oldest, p) =>
        new Date(p.createAt) < new Date(oldest.createAt) ? p : oldest
      );
      if (new Date(product.createAt) > new Date(oldestNewestProduct.createAt)) {
        newestCreatedProducts[
          newestCreatedProducts.indexOf(oldestNewestProduct)
        ] = product;
      }
    }
  }
  const topSaleProducts = products.reduce((result, product) => {
    if (result.length < 5) {
      result.push(product);
    } else {
      const lowestTopSaleProduct = result.reduce((lowest, p) =>
        p.saleCount < lowest.saleCount ? p : lowest
      );
      if (product.saleCount > lowestTopSaleProduct.saleCount) {
        result[result.indexOf(lowestTopSaleProduct)] = product;
      }
    }
    return result;
  }, []);
  const topSale = topSaleProducts.map((product) => ({
    label: product.name,
    value: product.saleCount,
  }));
  const formattedNewestCreatedProducts = newestCreatedProducts.map(
    (product) => ({
      id: product.productID,
      title: product.name,
      description: product.shortDescription,
      image: product?.images[0],
      postedAt: new Date(product.createAt),
    })
  );
  return (
    <>
      <Helmet>
        <title> Dashboard | Medicine Dashboard </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Weekly Sales"
              total={totalQuantitySoldLast7Days}
              icon={"ant-design:android-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Product"
              total={products.length}
              color="info"
              icon={"ant-design:apple-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Orders"
              total={orders.length}
              color="warning"
              icon={"ant-design:windows-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Weekly Revenue"
              total={revenueLastWeek}
              color="error"
              icon={"ant-design:bug-filled"}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Revenue"
              subheader={revenueRatio + " % than last month"}
              chartLabels={chartLabels}
              chartData={chartData}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Top 5 product sale"
              chartData={topSale}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
                theme.palette.success.main,
              ]}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: "Italy", value: 400 },
                { label: "Japan", value: 430 },
                { label: "China", value: 448 },
                { label: "Canada", value: 470 },
                { label: "France", value: 540 },
                { label: "Germany", value: 580 },
                { label: "South Korea", value: 690 },
                { label: "Netherlands", value: 1100 },
                { label: "United States", value: 1200 },
                { label: "United Kingdom", value: 1380 },
              ]}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={[
                "English",
                "History",
                "Physics",
                "Geography",
                "Chinese",
                "Math",
              ]}
              chartData={[
                { name: "Series 1", data: [80, 50, 30, 40, 100, 20] },
                { name: "Series 2", data: [20, 30, 40, 80, 20, 80] },
                { name: "Series 3", data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(
                () => theme.palette.text.secondary
              )}
            />
          </Grid> */}

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="New product"
              list={formattedNewestCreatedProducts}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={formattedLatestOrders}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
