interface IProductData {
  name: string;
}

interface IPriceData {
  currency: string;
  product_data: IProductData;
  unit_amount: number;
}

interface ILineItem {
  price_data: IPriceData;
  quantity: number;
}

export interface IStripePayment {
  line_items: ILineItem[];
  client_reference_id: number
}



// export interface IStripePayment {
//   line_items: [
//     {
//       price_data: {
//         currency: string;
//         product_data: {
//           name: string;
//         };
//         unit_amount: number;
//       };
//       quantity: number;
//     }
//   ];
// }
