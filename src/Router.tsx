import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/general-pages/Layout";
import { Home } from "./pages/general-pages/Home";
import { Products } from "./pages/products/Products";
import { Product } from "./pages/products/Product";
import { AdminLogin } from "./pages/general-pages/AdminLogin";
import { AdminHome } from "./pages/general-pages/AdminHome";
import { HandleProducts } from "./pages/products/HandleProducts";
import { HandleCustomers } from "./pages/customers/Customers";
import { UpdateProduct } from "./pages/products/UpdateProduct";
import { CreateProduct } from "./pages/products/CreateProduct";
import { CreateCustomer } from "./pages/customers/CreateCustomer";
import { UpdateCustomer } from "./pages/customers/UpdateCustomer";
import { Cart } from "./pages/cart/Cart";
import { HandleOrders } from "./pages/orders/Orders";
import { OrderDetails } from "./pages/orders/OrderDetails";
import { OrderConfirmation } from "./pages/checkout/OrderConfirmation";
import {Checkout} from "./pages/checkout/Checkout"
import Payment from "./pages/checkout/Payment";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/products",
        element: <Products></Products>,
      },
      {
        path: "product/:id",
        element: <Product></Product>,
      },
      {
        path: "/admin-login",
        element: <AdminLogin></AdminLogin>,
      },
      {
        path: "/cart",
        element: <Cart></Cart>,
      },
      {
        path: "/order-confirmation",
        element: <OrderConfirmation></OrderConfirmation>
      },
      {
        path: "/checkout",
        element: <Checkout></Checkout>,
      },
      {
        path: "/payment/:id",
        element: <Payment></Payment>,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminHome></AdminHome>,
    children: [
      {
        path: "/admin/handle-customers",
        element: <HandleCustomers></HandleCustomers>,
      },
      {
        path: "/admin/handle-products",
        element: <HandleProducts></HandleProducts>,
      },
      {
        path: "/admin/handle-orders",
        element: <HandleOrders></HandleOrders>,
      },
      {
        path: "/admin/create-product",
        element: <CreateProduct></CreateProduct>,
      },
      {
        path: "/admin/create-customer",
        element: <CreateCustomer></CreateCustomer>,
      },
      {
        path: "/admin/update-product/:id",
        element: <UpdateProduct></UpdateProduct>,
      },
      {
        path: "/admin/update-customer/:id",
        element: <UpdateCustomer></UpdateCustomer>,
      },
      {
        path: "/admin/order-details/:id",
        element: <OrderDetails></OrderDetails>,
      },
    ],
  },




]);
