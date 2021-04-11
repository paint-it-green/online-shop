import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { formatDate } from "@angular/common";

import { NzNotificationService } from "ng-zorro-antd/notification";

import { Product } from "src/app/shared/models";
import { ApiService } from "src/app/core/services/api";
import { ProductService } from "src/app/shared/services";
import { AuthService } from "src/app/shared/services";
import { ICart } from "src/app/shared/interfaces";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.scss"]
})
export class ProductDetailsComponent implements OnInit {

  constructor(
    private readonly _router: Router,
    private readonly _activeRoute: ActivatedRoute,
    private readonly _apiService: ApiService,
    private _productService: ProductService,
    private _authService: AuthService,
    private _viewContainerRef: ViewContainerRef,
    private _notificationService: NzNotificationService,
  ) { }

  isLoading = true;
  product = new Product();
  qty = 1;

  ngOnInit(): void {
    this._getProduct();
  }

  private async _getProduct(): Promise<void> {
    try {
      const id = this._activeRoute.snapshot.params.id;
      this.isLoading = true;
      const product = await this._apiService.get("products", { pathVars: { id } }).toPromise();
      this.product.deserialize(this._productService.addCustomDetails(product));
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
    }
  }

  numberOnly(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  minusQty(): void {
    if (this.qty === 1) {
      return;
    }
    this.qty--;
  }

  addQty(): void {
    this.qty++;
  }

  addToCart(): void {
    this._onAction(false);
  }

  buyNow(): void {
    this._onAction(true);
  }

  private _onAction(redirect: boolean): void {
    if (this._authService.isLoggedIn() === false) {
      return this._login(this._addToCart.bind(this), redirect);
    }
    this._addToCart(redirect);
  }

  private async _addToCart(redirect: boolean): Promise<void> {
    try {
      await this._apiService.post("carts", this._getCartData()).toPromise();
      this._showAlert("success", "Item has been added to your shopping cart");
      if (redirect) {
        this._router.navigate(["../cart"], { relativeTo: this._activeRoute.parent });
      }
    } catch (error) {
    }
  }

  private _getCartData(): ICart {
    return {
      userId: this._authService.getUser().id,
      date: formatDate(new Date(), "yyyy-MM-dd", "en-US"),
      products: [
        {
          quantity: this.qty,
          productId: this.product.id
        }
      ]
    };
  }

  private _login(callback: ((args: boolean) => void), redirect: boolean): void {
    this._authService.login(this._viewContainerRef)
      .subscribe((result: boolean) => {
        if (result) {
          callback(redirect);
        }
      });
  }

  private _showAlert(type: string, title: string, content = ""): void {
    this._notificationService.create(type, title, content, {
      nzAnimate: true,
      nzPauseOnHover: true,
      nzCloseIcon: "close",
    });
  }

}
