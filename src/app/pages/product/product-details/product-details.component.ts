import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Product } from "src/app/shared/models/product.model";
import { ApiService } from "src/app/core/services/api";
import { ProductService } from "src/app/shared/services";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.scss"]
})
export class ProductDetailsComponent implements OnInit {

  constructor(
    private readonly _activeRoute: ActivatedRoute,
    private readonly _apiService: ApiService,
    private _productService: ProductService,
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

}
