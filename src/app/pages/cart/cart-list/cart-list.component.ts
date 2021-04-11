import { Component, OnInit } from "@angular/core";
import { NzModalService } from "ng-zorro-antd/modal";

import { ApiService } from "src/app/core/services/api";
import { ICart, ICartProduct, IProduct } from "src/app/shared/interfaces";
import { Cart } from "src/app/shared/models";
import { AuthService } from "src/app/shared/services";

export interface Data {
  id: number;
  name: string;
  age: number;
  address: string;
  disabled: boolean;
}

@Component({
  selector: "app-cart-list",
  templateUrl: "./cart-list.component.html",
  styleUrls: ["./cart-list.component.scss"]
})
export class CartListComponent implements OnInit {

  constructor(
    private readonly _apiService: ApiService,
    private readonly _authService: AuthService,
    private _modal: NzModalService
  ) { }

  private _products: ReadonlyArray<IProduct> = [];
  cart = new Cart();
  isLoading = true;

  checked = false;
  indeterminate = false;
  listOfCurrentPageData: ReadonlyArray<ICartProduct> = [];
  setOfCheckedId = new Set<number>();

  ngOnInit(): void {
    this._getCartProducts();
  }

  private async _getCartProducts(): Promise<void> {
    try {
      const user = this._authService.getUser();
      const carts = await this._apiService.get("userCart", { pathVars: { id: "" + user.id } }).toPromise();
      const products = await this._apiService.get("products").toPromise();
      this._products = products;
      this.isLoading = false;
      this._populateCartProducts(carts);
    } catch (error) {

    }
  }

  private _populateCartProducts(carts: ICart[]): void {
    const cart = carts[0];
    cart.products = cart.products.map((cartProduct) => {
      const product = this._products.find((p) => p.id === cartProduct.productId);
      if (product) {
        cartProduct.product = product;
        cartProduct.totalPrice = cartProduct.quantity * product.price;
      }
      return cartProduct;
    });
    this.cart.deserialize(cart);
  }

  decreaseQty(product: ICartProduct): void {
    this.cart.decreaseQty(product.productId);
  }

  increaseQty(product: ICartProduct): void {
    this.cart.increaseQty(product.productId);
  }

  confirmRemove(productId: number): void {
    this._modal.confirm({
      nzTitle: "Are you sure to remove this item?",
      nzOkText: "Yes",
      nzOkType: "primary",
      nzOkDanger: true,
      nzOnOk: () => this.remove(productId),
      nzCancelText: "No"
    });
  }

  remove(productId: number): void {
    this.cart.removeProduct(productId);
  }

  onCurrentPageDataChange(listOfCurrentPageData: ReadonlyArray<ICartProduct>): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this._refreshCheckedStatus();
  }

  onItemChecked(id: number, checked: boolean): void {
    this._updateCheckedSet(id, checked);
    this._refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData.forEach(({ productId }) => this._updateCheckedSet(productId, checked));
    this._refreshCheckedStatus();
  }

  private _updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  private _refreshCheckedStatus(): void {
    this.checked = (this.listOfCurrentPageData.length === 0) ? false
      : this.listOfCurrentPageData.every(({ productId }) => this.setOfCheckedId.has(productId));
    this.indeterminate = this.listOfCurrentPageData.some(({ productId }) => this.setOfCheckedId.has(productId)) && !this.checked;
  }

}
