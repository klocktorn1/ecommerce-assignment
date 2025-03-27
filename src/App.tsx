import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./Router";
import { CartProvider } from "./contexts/CartContext";
import { ProductsProvider } from "./contexts/ProductsContext";
import { CustomersProvider } from "./contexts/CustomersContext";
import { OrdersProvider } from "./contexts/OrdersContext";


function App() {

  return (
    <>
      <OrdersProvider>
        <CustomersProvider>
          <ProductsProvider>
            <CartProvider>
              <RouterProvider router={router}></RouterProvider>
            </CartProvider>
          </ProductsProvider>
        </CustomersProvider>
      </OrdersProvider>
    </>
  );
}

export default App;
