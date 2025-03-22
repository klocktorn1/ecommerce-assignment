interface iProductData {
  name: string;
}

interface IPriceData {
  currency: string;
  product_data: iProductData;
  unit_amount: number;
}

interface ILineItems {
  price_data: IPriceData;
  quantity: number;
}

export interface IStripePayment {
  line_items: ILineItems[];
}
