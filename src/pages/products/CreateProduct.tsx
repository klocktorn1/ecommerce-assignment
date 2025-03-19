import { RenderCreateProductForm } from "../../components/products/RenderCreateProductForm";

export const CreateProduct = () => {
  return (
    <>
      <div className="flex flex-col items-center gap-4 ">
        <h1 className="">Create new product</h1>
        <RenderCreateProductForm></RenderCreateProductForm>
      </div>
    </>
  );
};
