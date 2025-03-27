import { useContext, useEffect, useState } from "react";
import { IProduct, IUpdateAndCreateProduct } from "../models/IProduct";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../services/productsService";
import { ProductsContext } from "../contexts/ProductsContext";
import { IProductsActionType } from "../reducers/ProductsReducer";

export const useProducts = () => {
  const { products, productsDispatch } = useContext(ProductsContext);
  const [product, setProduct] = useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setTimeout(() => {
      localStorage.removeItem("products");
    }, 1000 * 60 * 10);
    if (products.length > 0) return;
    getProductsHandler();
  }, []);

  const getProductsHandler = async () => {
    setIsLoading(true);
    try {
      const data = await getAllProducts();

      productsDispatch({
        type: IProductsActionType.FETCHED,
        payload: JSON.stringify(data),
      });
    } catch (error) {
      setError("Error fetching products");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCachedProductById = (id: string) => {
    const cachedProduct = products.find((p) => p.id === +id);
    if (!cachedProduct) return null;
    setProduct(cachedProduct);
    return cachedProduct;
  };

  const getProductByIdHandler = async (id: string) => {
    const cachedProduct = fetchCachedProductById(id);
    if (cachedProduct) return cachedProduct;
    setIsLoading(true);
    try {
      const data = await getProductById(id);
      setProduct(data);
      return data;
    } catch (error) {
      setError("Error fetching product");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProductHandler = async (id: number) => {
    setIsLoading(true);
    try {
      await deleteProduct(id);
      productsDispatch({
        type: IProductsActionType.DELETED,
        id: id,
      });
    } catch (error) {
      setError("Error deleting product");
    } finally {
      setIsLoading(false);
    }
  };

  const updateProductHandler = async (
    id: number,
    payload: IUpdateAndCreateProduct
  ) => {
    setIsLoading(true);
    try {
      await updateProduct(id, payload);

      productsDispatch({
        type: IProductsActionType.UPDATED,
        payload: JSON.stringify(payload),
        id: id,
      });
    } catch (error) {
      setError("Error updating product" + error);
    } finally {
      setIsLoading(false);
    }
  };

  const createProductHandler = async (payload: IUpdateAndCreateProduct) => {
    setIsLoading(true);
    try {
      await createProduct(payload);

      productsDispatch({
        type: IProductsActionType.CREATED,
        payload: JSON.stringify(payload),
      });
    } catch (error) {
      setError("Error creating product" + error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    products,
    product,
    isLoading,
    error,
    getProductsHandler,
    getProductByIdHandler,
    updateProductHandler,
    deleteProductHandler,
    createProductHandler,
  };
};
