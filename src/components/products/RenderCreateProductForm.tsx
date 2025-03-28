import { useProducts } from "../../hooks/useProducts";
import { ChangeEvent, FormEvent, useState } from "react";
import { IUpdateAndCreateProduct } from "../../models/IProduct";
import { useNavigate } from "react-router-dom";

export const RenderCreateProductForm = () => {
  const { createProductHandler, error } = useProducts();
  const navigate = useNavigate();
  const [createdProduct, setCreatedProduct] =
    useState<IUpdateAndCreateProduct | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (
      !createdProduct?.name ||
      !createdProduct?.description ||
      !createdProduct?.price ||
      !createdProduct?.stock ||
      !createdProduct?.category ||
      !createdProduct?.image
    ) {
      alert("no");
      return;
    }

    if (createdProduct) {
      await createProductHandler(createdProduct);
       
    }
    navigate("/admin/handle-products");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "text")
      setCreatedProduct({
        ...createdProduct!,
        [e.target.name]: e.target.value,
      });

    if (e.target.type === "number") {
      setCreatedProduct({
        ...createdProduct!,
        [e.target.name]: +e.target.value,
      });
    }
  };

  return (
    <>
      
        <form action="" className="flex flex-col gap-5">
          <input
            name="name"
            placeholder="name"
            type="text"
            onChange={handleChange}
          />
          <input
            name="description"
            placeholder="description"
            type="text"
            onChange={handleChange}
          />
          <input
            name="price"
            placeholder="price"
            type="number"
            onChange={handleChange}
          />
          <input
            name="stock"
            placeholder="stock"
            type="number"
            onChange={handleChange}
          />
          <input
            name="category"
            placeholder="category"
            type="text"
            onChange={handleChange}
          />
          <input
            name="image"
            placeholder="image url"
            type="text"
            onChange={handleChange}
          />
          <button className="text-white hover:cursor-pointer hover:scale-120 bg-blue-600" onClick={handleSubmit}>Submit</button>
        </form>
      
    </>
  );
};
