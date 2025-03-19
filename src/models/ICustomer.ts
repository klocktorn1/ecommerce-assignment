export interface ICustomer {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
  street_address: string;
  postal_code: string;
  city: string;
  country: string;
  created_at: string
}

export interface IUpdateAndCreateCustomer {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
  street_address: string;
  postal_code: string;
  city: string;
  country: string;
}


