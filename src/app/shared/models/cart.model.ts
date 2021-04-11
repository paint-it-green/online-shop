import { Deserializable } from "./deserialize.model";
import { ICart, ICartProduct } from "../interfaces";

export class Cart implements Deserializable, ICart {

  id?: number | undefined;
  userId!: number;
  date!: string;
  products!: ICartProduct[];

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

  getCart(): ICart {
    return {
      id: this.id,
      userId: this.userId,
      date: this.date,
      products: this.products
    };
  }

  getAddToCart(): ICart {
    return {
      userId: this.userId,
      date: this.date,
      products: this.products
    };
  }

  decreaseQty(productId: number): void {
    const index = this.products.findIndex((p) => p.productId === productId);
    if (index >= 0) {
      const product = this.products[index];
      if (product.quantity === 1) {
        this.removeProduct(productId);
        return;
      }
      product.quantity--;
      this.updateTotalPrice(product);
    }
  }

  increaseQty(productId: number): void {
    const index = this.products.findIndex((p) => p.productId === productId);
    if (index >= 0) {
      const product = this.products[index];
      product.quantity++;
      this.updateTotalPrice(product);
    }
  }

  updateTotalPrice(product: ICartProduct): void {
    const productItem = product.product;
    if (productItem) {
      product.totalPrice = product.quantity * productItem.price;
    }
    return;
  }

  removeProduct(productId: number): boolean {
    const index = this.products.findIndex((p) => p.productId === productId);
    if (index >= 0) {
      this.products.splice(index, 1);
      this.products = [...this.products];
      return true;
    }
    return false;
  }

}
