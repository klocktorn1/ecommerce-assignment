import { IProduct } from "./IProduct";

export class Cart {
  constructor(public product: IProduct, public amount: number) {}
}


// export interface ICart {
//   product: IProduct;
//   amount: number;
// }
