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
import Home from "./pages/client/Home";
import ProductDetails from "./pages/client/ProductDetails";
import ProductsList from "./pages/client/ProductsListPage";
import Checkout from "./pages/client/CheckoutPage";
import AdminCheckout from "./pages/admin/CheckoutPage";
import AddressForm from "./sections/@client/products/checkout/AddressForm";
import CreateStore from "./pages/admin/CreateStore";
import StorePage from "./pages/admin/StorePage";
import AdminOrder from "./pages/admin/AdminOrder";
import OrderPage from "./pages/client/OrderPage";
import OrderStorePage from "./pages/admin/OrderStorePage";
// import FunctionalFoodsList from './pages/client/FunctionalFoodsList';
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: "app", element: <DashboardAppPage /> },
        { path: "store", element: <StorePage /> },
        { path: "store/new", element: <CreateStore /> },
        { path: "checkout", element: <AdminCheckout /> },
        { path: "order", element: <OrderStorePage /> },
        { path: "buy", element: <AdminOrder /> },
        { path: "products", element: <ProductsPage /> },
        { path: "user", element: <UserPage /> },
        { path: "blog", element: <BlogPage /> },
        { path: "products/new", element: <CreateProduct /> },
        { path: "products/edit/:productID", element: <EditProduct /> },
      ],
    },
    {
      path: "/",
      element: <ClientLayout />,
      children: [
        { element: <Navigate to="/home" />, index: true },
        { path: "home", element: <Home /> },
        { path: "product-details/:id", element: <ProductDetails /> },
        { path: "blog", element: <BlogPage /> },
        { path: "list-products/:id", element: <ProductsList /> },
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
        { element: <Navigate to="/home" />, index: true },
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
