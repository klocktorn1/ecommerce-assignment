import { IProduct } from "../../models/IProduct";

interface RenderProductsInfoAdminProps {
  products: IProduct[]
}
export const RenderProductsInfoAdmin = ({products}: RenderProductsInfoAdminProps) => {
  return (
    <>
      {products}

    </>
  );
};
