import { IProduct } from "./product.interface";

export interface ICart {
  id?: number | undefined;
  userId: number;
  date: string;
  products: Array<ICartProduct>;
}

export interface ICartProduct {
  product?: IProduct;
  productId: number;
  quantity: number;
  totalPrice?: number;
}
