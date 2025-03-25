import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./Router";
import { CartProvider } from "./contexts/CartContext";
import { ProductsProvider } from "./contexts/ProductsContext";
import { CustomerProvider } from "./contexts/CustomerContext";
import { OrderProvider } from "./contexts/OrdersContext";

function App() {
  return (
    <>
      <OrderProvider>
        <CustomerProvider>
          <ProductsProvider>
            <CartProvider>
              <RouterProvider router={router}></RouterProvider>
            </CartProvider>
          </ProductsProvider>
        </CustomerProvider>
      </OrderProvider>
    </>
  );
}

export default App;
