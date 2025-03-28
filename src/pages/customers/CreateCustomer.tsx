import { RenderCreateCustomerForm } from "../../components/customers/RenderCreateCustomerForm";

export const CreateCustomer = () => {
  return (
    <>
      <div className="flex flex-col items-center gap-4 ">
        <h1 className="text-white">Create new customer</h1>
        <RenderCreateCustomerForm></RenderCreateCustomerForm>
      </div>
    </>
  );
};
