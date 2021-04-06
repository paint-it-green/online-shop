import { Deserializable } from "./deserialize.model";
import { IProduct } from "../interfaces/product.interface";

export class Product implements Deserializable, IProduct {

  id!: number;
  title!: string;
  price!: number;
  image!: string;
  description!: string;
  category!: string;
  totalSold!: string;
  rating!: number;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

}
