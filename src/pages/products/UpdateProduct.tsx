import { useParams } from "react-router-dom";
import { RenderUpdateProductForm } from "../../components/products/RenderUpdateProductForm";
import { useProducts } from "../../hooks/useProducts";
import { useEffect } from "react";

export const UpdateProduct = () => {
  const { id } = useParams();

  const { getProductByIdHandler, product } = useProducts();
  
  

  useEffect(() => {
    const getProductById = async () => {
      id && await getProductByIdHandler(id);
    }
    getProductById()
  }, [id, getProductByIdHandler]);

  return <>{id && product && <RenderUpdateProductForm id={id} product={product}></RenderUpdateProductForm>}</>;
};
