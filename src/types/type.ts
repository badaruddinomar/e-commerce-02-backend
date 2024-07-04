export interface RegisterUserType {
  _id: string;
  name: string;
  email: string;
  password: string;
  gender: string;
  dob: Date;
}
export interface NewProductType {
  name: string;
  photo: string;
  price: number;
  stock: number;
  category: string;
}

export type SearchRequestQueryType = {
  search?: string;
  price?: string;
  category?: string;
  sort?: string;
  page?: string;
};

export type SearchBaseQueryType = {
  name?: {
    $regex: string;
    $options: string;
  };
  price?: {
    $lte: number;
  };
  category?: string;
};

export type OrderItemsType = {
  name: string;
  photo: string;
  price: number;
  quantity: number;
  productId: string;
};
export type ShippingInfoType = {
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
};
export interface NewOrderType {
  shippingInfo: ShippingInfoType;
  user: string;
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  products: OrderItemsType[];
}
