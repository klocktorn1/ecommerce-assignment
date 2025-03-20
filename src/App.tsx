import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./Router";
import { useEffect, useReducer } from "react";
import { CartContext } from "./contexts/CartContext";
import { CartReducer } from "./reducers/CartReducer";
import {
  IProductsActionType,
  ProductsReducer,
} from "./reducers/ProductsReducer";
import { ProductsContext } from "./contexts/ProductsContext";
import { getAllProducts } from "./services/productsService";
import { getAllCustomers } from "./services/customersService";
import {
  CustomersReducer,
  ICustomersActionType,
} from "./reducers/CustomersReducer";
import { CustomersContext } from "./contexts/CustomerContext";
import { OrdersContext } from "./contexts/OrdersContext";
import { OrdersReducer } from "./reducers/OrdersReducer";

function App() {
  const [cart, cartDispatch] = useReducer(CartReducer, [], () => {
    const cachedCart = localStorage.getItem("cart");
    return cachedCart ? JSON.parse(cachedCart) : [];
  });

  const [products, productsDispatch] = useReducer(ProductsReducer, [], () => {
    const cachedProducts = localStorage.getItem("products");
    return cachedProducts ? JSON.parse(cachedProducts) : [];
  });

  const [customers, customersDispatch] = useReducer(
    CustomersReducer,
    [],
    () => {
      const cachedCustomers = localStorage.getItem("customers");
      return cachedCustomers ? JSON.parse(cachedCustomers) : [];
    }
  );

  const [orders, ordersDispatch] = useReducer(OrdersReducer, [], () => {
    const cachedOrders = localStorage.getItem("orders");
    return cachedOrders ? JSON.parse(cachedOrders) : [];
  });

  useEffect(() => {
    const fetchAllProducts = async () => {
      const data = await getAllProducts();
      productsDispatch({
        type: IProductsActionType.FETCHED,
        payload: JSON.stringify(data),
      });
    };

    fetchAllProducts();
  }, []);

  useEffect(() => {
    const fetchAllCustomers = async () => {
      const data = await getAllCustomers();
      customersDispatch({
        type: ICustomersActionType.FETCHED,
        payload: JSON.stringify(data),
      });
    };

    fetchAllCustomers();
  }, []);

  return (
    <>
      <OrdersContext.Provider value={{ orders, ordersDispatch }}>
        <CustomersContext.Provider value={{ customers, customersDispatch }}>
          <ProductsContext.Provider value={{ products, productsDispatch }}>
            <CartContext.Provider value={{ cart, cartDispatch }}>
              <RouterProvider router={router}></RouterProvider>
            </CartContext.Provider>
          </ProductsContext.Provider>
        </CustomersContext.Provider>
      </OrdersContext.Provider>
    </>
  );
}

export default App;
