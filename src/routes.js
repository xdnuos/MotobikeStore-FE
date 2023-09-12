import { Navigate, useRoutes } from "react-router-dom";
// layouts
import ClientLayout from "./layouts/client/ClientLayout";
import DashboardLayout from "./layouts/dashboard";
import SimpleLayout from "./layouts/simple";
import BlogPage from "./pages/admin/BlogPage";
import DashboardAppPage from "./pages/admin/DashboardAppPage";
import PersonalInfoForm from "./pages/admin/InfoPage";
import InventoryManagement from "./pages/admin/InventoryManagementPage";
import Page404 from "./pages/admin/Page404";
import ProfileAdmin from "./pages/admin/ProfilePage";
import AdminOrder from "./pages/admin/buy/AdminOrder";
import AdminProductDetails from "./pages/admin/buy/AdminProductDetails";
import AdminCheckout from "./pages/admin/buy/CheckoutPage";
import Invoice from "./pages/admin/buy/InvoicePage";
import OrderDetail from "./pages/admin/order/OrderDetail";
import OrdersPage from "./pages/admin/order/OrdersPage";
import CreateProduct from "./pages/admin/product/CreateProduct";
import EditProduct from "./pages/admin/product/EditProduct";
import ProductsPage from "./pages/admin/product/ProductsPage";
import ManageCategoriesPage from "./pages/admin/productPropeties/CategoryPage";
import ManageManufacturerPage from "./pages/admin/productPropeties/ManufacturerPage";
import ManageTagsPage from "./pages/admin/productPropeties/TagPage";
import CreateStaff from "./pages/admin/staff/CreateStaff";
import EditStaff from "./pages/admin/staff/EditStaff";
import StaffDetail from "./pages/admin/staff/StaffDetail";
import Staff from "./pages/admin/staff/StaffPage";
import UserDetail from "./pages/admin/user/UserOrder";
import UserPage from "./pages/admin/user/UserPage";
import ActiveAccountPage from "./pages/auth/ActiveAccountPage";
import LoginPage from "./pages/auth/LoginPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import AccountPage from "./pages/client/AccountPage";
import Checkout from "./pages/client/CheckoutPage";
import HomePage from "./pages/client/HomePage";
import OrderPage from "./pages/client/OrderPage";
import ProductDetailsPage from "./pages/client/ProductDetailsPage";
import ProductsListPage from "./pages/client/ProductsListPage";
import Address from "./sections/@client/account/Address";
import ChangePassword from "./sections/@client/account/ChangePassword";
import ProfilePage from "./sections/@client/account/Profile";
import CreateReceipt from "./sections/@dashboard/products/CreateReceipt";
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
        { path: "staff/:staffUserID", element: <StaffDetail /> },
        { path: "staff/new", element: <CreateStaff /> },
        { path: "staff/edit/:staffUserID", element: <EditStaff /> },
        { path: "info", element: <PersonalInfoForm /> },
        { path: "profile", element: <ProfileAdmin /> },
        { path: "categories", element: <ManageCategoriesPage /> },
        { path: "tags", element: <ManageTagsPage /> },
        { path: "manufacturer", element: <ManageManufacturerPage /> },
      ],
    },
    {
      element: <ClientLayout />,
      children: [
        { element: <HomePage />, index: true },
        { path: "product-details/:id", element: <ProductDetailsPage /> },
        { path: "blog", element: <BlogPage /> },
        { path: "list-products/:id", element: <ProductsListPage /> },
        { path: "checkout", element: <Checkout /> },
        {
          path: "account",
          element: <AccountPage />,
          children: [
            { element: <Navigate to="/account/profile" />, index: true },
            { path: "profile", element: <ProfilePage /> },
            { path: "address", element: <Address /> },
            { path: "changePassword", element: <ChangePassword /> },
            { path: "order", element: <OrderPage /> },
            // Thêm các route con khác tại đây
          ],
        },
      ],
    },
    {
      element: <LoginPage />,
      children: [{ path: "/login" }, { path: "/register" }],
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
