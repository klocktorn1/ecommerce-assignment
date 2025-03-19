export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image: string;
  created_at: string;
}

export interface IUpdateAndCreateProduct {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image: string;
}
