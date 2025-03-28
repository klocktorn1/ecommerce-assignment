import { RenderCartItems } from "../../components/cart/RenderCartItems";
import { RenderShippingInformationForm } from "../../components/checkout/RenderShippingInformationForm";

export const Checkout = () => {
  return (
    <>
      <div className="flex flex-col gap-5 md:flex-row md:justify-around ">
        <div className="md:w-1/2">
          <RenderCartItems isOnCheckoutPage={true}></RenderCartItems>
        </div>
        <div className="flex flex-col items-center gap-4 mt-3 self-center w-1/2 shadow-md shadow-[#939393] mb-5">
        <h2 className="font-bebas text-lg">Shipping information</h2>
          <RenderShippingInformationForm></RenderShippingInformationForm>
        </div>
      </div>
    </>
  );
};
