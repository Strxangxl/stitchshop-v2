export interface IProduct {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICartItem {
  product: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: number;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token?: string;
}

export interface IOrderItems {
  name: string;
  qty: number;
  image: string;
  price: number;
  product: string;
}

export interface IShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface IOrder {
  _id: string;
  user: string;
  orderItems: IOrderItems[];
  shippingAddress: IShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  createdAt?: string;
}
