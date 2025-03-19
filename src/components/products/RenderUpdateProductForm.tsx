import { useProducts } from "../../hooks/useProducts";
import { ChangeEvent, FormEvent, useState } from "react";
import { IProduct, IUpdateAndCreateProduct } from "../../models/IProduct";
import { useNavigate } from "react-router-dom";

interface IRenderUpdateProductFormProps {
  id: string;
  product: IProduct;
}

export const RenderUpdateProductForm = ({ id, product }: IRenderUpdateProductFormProps) => {
  const { updateProductHandler, error } = useProducts();
  const navigate = useNavigate()
  const [updatedProduct, setUpdatedProduct] = useState<IUpdateAndCreateProduct>(
    {
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category: product.category,
      image: product.image,
    }
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (id && updatedProduct) {
      await updateProductHandler(+id, updatedProduct);
    }
    navigate("/admin/handle-products")
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "text")
      setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });

    if (e.target.type === "number") {
      setUpdatedProduct({
        ...updatedProduct,
        [e.target.name]: +e.target.value,
      });
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <form action="" className="flex flex-col gap-5">
          <img className="size-50" src={product?.image} alt="" />
          <input
            name="name"
            defaultValue={product?.name}
            type="text"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <input
            name="description"
            defaultValue={product?.description}
            type="text"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <input
            name="price"
            defaultValue={product?.price}
            type="number"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <input
            name="stock"
            defaultValue={product?.stock}
            type="number"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <input
            name="category"
            defaultValue={product?.category}
            type="text"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <button
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
