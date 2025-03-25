import axios from "axios";
import { handleRequest } from "./baseService";
import { IProduct, IUpdateAndCreateProduct } from "../models/IProduct";

export const getAllProducts = async () => {
  const data: IProduct[] = await handleRequest(axios.get("http://localhost:3000/products"));  
  return data
};

export const getProductById = async (id: string) => {
    const data: IProduct = await handleRequest(axios.get(`http://localhost:3000/products/${id}`));
    return data
  };

  export const deleteProduct = async (id: number) => {
    await handleRequest(axios.delete(`http://localhost:3000/products/${id}`))
  }


  export const updateProduct = async (id: number, payload: IUpdateAndCreateProduct)=> {
    await handleRequest(axios.patch(`http://localhost:3000/products/${id}`, payload))
  }

  export const createProduct = async (payload: IUpdateAndCreateProduct) => {
    return await handleRequest(axios.post(`http://localhost:3000/products`, payload))
  }
