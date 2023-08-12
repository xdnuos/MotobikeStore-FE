// component
import SvgColor from "../../../components/svg-color";
import { Icon } from "@iconify/react";
// ----------------------------------------------------------------------
const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: "dashboard",
    path: "/dashboard/app",
    icon: <Icon icon="fluent-mdl2:b-i-dashboard" />,
  },
  {
    title: "Store",
    path: "/dashboard/buy",
    icon: <Icon icon="ic:outline-local-grocery-store" />,
  },
  {
    title: "Order",
    path: "/dashboard/orders",
    icon: <Icon icon="icon-park-outline:order" />,
  },
  {
    title: "Product",
    path: "/dashboard/products",
    icon: <Icon icon="icon-park:ad-product" />,
  },
  {
    title: "Warehouse",
    path: "/dashboard/stock",
    icon: <Icon icon="vaadin:stock" />,
  },
  {
    title: "User",
    path: "/dashboard/users",
    icon: <Icon icon="ph:user-bold" />,
  },
  {
    title: "Staff",
    path: "/dashboard/staff",
    icon: <Icon icon="icon-park-outline:file-staff-one" />,
  },
];

const navConfigStore = [
  {
    title: "dashboard",
    path: "/dashboard/app",
    icon: icon("ic_analytics"),
  },
  {
    title: "Order",
    path: "/dashboard/order",
    icon: icon("ic_cart"),
  },
  {
    title: "blog",
    path: "/dashboard/blog",
    icon: icon("ic_blog"),
  },
  {
    title: "login",
    path: "/login",
    icon: icon("ic_lock"),
  },
  {
    title: "Not found",
    path: "/404",
    icon: icon("ic_disabled"),
  },
];
export { navConfig, navConfigStore };
