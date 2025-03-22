import { RenderCartItems } from "../../components/cart/RenderCartItems";
import { RenderShippingInformationForm } from "../../components/checkout/RenderShippingInformationForm";

export const Checkout = () => {
  return (
    <>
      <div className="flex gap-5 justify-around">
        <div>
          <h1>Checkout</h1>
          <RenderShippingInformationForm></RenderShippingInformationForm>
        </div>
  
        <div>
          <h1>Your cart:</h1>
          <RenderCartItems></RenderCartItems>
        </div>
      </div>
    </>
  );
};
