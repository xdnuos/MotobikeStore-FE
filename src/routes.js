import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import SimpleLayout from "./layouts/simple";
import ClientLayout from "./layouts/client/ClientLayout";
import BlogPage from "./pages/admin/BlogPage";
import UserPage from "./pages/admin/user/UserPage";
import LoginPage from "./pages/auth/LoginPage";
import Page404 from "./pages/admin/Page404";
import ProductsPage from "./pages/admin/product/ProductsPage";
import DashboardAppPage from "./pages/admin/DashboardAppPage";
import CreateProduct from "./pages/admin/product/CreateProduct";
import EditProduct from "./pages/admin/product/EditProduct";
import HomePage from "./pages/client/HomePage";
import ProductDetailsPage from "./pages/client/ProductDetailsPage";
import AdminProductDetails from "./pages/admin/buy/AdminProductDetails";
import ProductsListPage from "./pages/client/ProductsListPage";
import Checkout from "./pages/client/CheckoutPage";
import AdminCheckout from "./pages/admin/buy/CheckoutPage";
import CreateStore from "./pages/admin/store/CreateStore";
import StorePage from "./pages/admin/store/StorePage";
import AdminOrder from "./pages/admin/buy/AdminOrder";
import OrderPage from "./pages/client/OrderPage";
import OrdersPage from "./pages/admin/order/OrdersPage";
import InventoryManagement from "./pages/admin/InventoryManagementPage";
import CreateReceipt from "./sections/@dashboard/products/CreateReceipt";
import Staff from "./pages/admin/staff/StaffPage";
import CreateStaff from "./pages/admin/staff/CreateStaff";
import EditStaff from "./pages/admin/staff/EditStaff";
import Invoice from "./pages/admin/buy/InvoicePage";
import UserDetail from "./pages/admin/user/UserOrder";
import OrderDetail from "./pages/admin/order/OrderDetail";
import ActiveAccountPage from "./pages/auth/ActiveAccountPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/buy" />, index: true },
        { path: "app", element: <DashboardAppPage /> },
        { path: "checkout", element: <AdminCheckout /> },
        { path: "orders", element: <OrdersPage /> },
        { path: "orders/:orderID", element: <OrderDetail /> },
        { path: "buy", element: <AdminOrder /> },
        { path: "users", element: <UserPage /> },
        { path: "users/:userID", element: <UserDetail /> },
        { path: "products", element: <ProductsPage /> },
        { path: "products/new", element: <CreateProduct /> },
        { path: "products/edit/:productID", element: <EditProduct /> },
        { path: "product/:id", element: <AdminProductDetails /> },
        { path: "stock", element: <InventoryManagement /> },
        { path: "stock/new", element: <CreateReceipt /> },
        { path: "staff", element: <Staff /> },
        { path: "staff/new", element: <CreateStaff /> },
        { path: "staff/edit/:staffID", element: <EditStaff /> },
      ],
    },
    {
      element: <ClientLayout />,
      children: [
        { element:  <HomePage />, index: true },
        { path: "product-details/:id", element: <ProductDetailsPage /> },
        { path: "blog", element: <BlogPage /> },
        { path: "list-products", element: <ProductsListPage /> },
        { path: "checkout", element: <Checkout /> },
        { path: "order", element: <OrderPage /> },
      ],
    },
    {
      element: <LoginPage />,
      children: [
        { path: "/login"},
        { path: "/register"}
      ]
    },
    { path: "/activate/:token", element: <ActiveAccountPage /> },
    { path: "/reset/:token", element: <ResetPasswordPage /> },
    { path: "/dashboard/invoice/:orderID", element: <Invoice /> },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/" />, index: true },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
