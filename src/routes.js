import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import SimpleLayout from "./layouts/simple";
import ClientLayout from "./layouts/client/ClientLayout";
import BlogPage from "./pages/admin/BlogPage";
import UserPage from "./pages/admin/UserPage";
import LoginPage from "./pages/admin/LoginPage";
import Page404 from "./pages/admin/Page404";
import ProductsPage from "./pages/admin/product/ProductsPage";
import DashboardAppPage from "./pages/admin/DashboardAppPage";
import CreateProduct from "./pages/admin/product/CreateProduct";
import EditProduct from "./pages/admin/product/EditProduct";
import HomePage from "./pages/client/HomePage";
import ProductDetailsPage from "./pages/client/ProductDetailsPage";
import AdminProductDetails from "./pages/admin/AdminProductDetails";
import ProductsListPage from "./pages/client/ProductsListPage";
import Checkout from "./pages/client/CheckoutPage";
import AdminCheckout from "./pages/admin/CheckoutPage";
import AddressForm from "./sections/@client/products/checkout/AddressForm";
import CreateStore from "./pages/admin/CreateStore";
import StorePage from "./pages/admin/StorePage";
import AdminOrder from "./pages/admin/AdminOrder";
import OrderPage from "./pages/client/OrderPage";
import OrdersPage from "./pages/admin/OrdersPage";
import InventoryManagement from "./pages/admin/InventoryManagementPage";
// import FunctionalFoodsList from './pages/client/FunctionalFoodsList';
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
        { path: "buy", element: <AdminOrder /> },
        { path: "users", element: <UserPage /> },
        { path: "products", element: <ProductsPage /> },
        { path: "products/new", element: <CreateProduct /> },
        { path: "products/edit/:productID", element: <EditProduct /> },
        { path: "product/:id", element: <AdminProductDetails /> },
        { path: "stock", element: <InventoryManagement /> },
      ],
    },
    {
      path: "/",
      element: <ClientLayout />,
      children: [
        { element:  <HomePage />, index: true },
        { path: "product-details/:id", element: <ProductDetailsPage /> },
        { path: "blog", element: <BlogPage /> },
        { path: "list-products/:id", element: <ProductsListPage /> },
        { path: "checkout", element: <Checkout /> },
        { path: "address", element: <AddressForm /> },
        { path: "order", element: <OrderPage /> },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
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
