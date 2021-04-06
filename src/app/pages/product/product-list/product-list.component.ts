import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { ApiService } from "src/app/core/services/api";
import { IProduct } from "src/app/shared/interfaces";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"]
})
export class ProductListComponent implements OnInit {

  constructor(
    private readonly _activeRoute: ActivatedRoute,
    private readonly _router: Router,
    private readonly _apiService: ApiService,
  ) { }

  products = [] as Array<IProduct>;
  skeletonCount = 10;
  isLoading = true;
  activeCategory = "";

  ngOnInit(): void {
    this._getProducts();
  }

  private async _getProducts(): Promise<void> {
    try {
      this.isLoading = true;
      const products = await this._apiService.get("products").toPromise();
      this.products = products;
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
    }
  }

  onSelectCategory(category: string): void {
    this.activeCategory = category;
    this._router.navigate(["../category"], { relativeTo: this._activeRoute, queryParams: { category } });
    this._getProducts();
  }

  viewProduct(product: IProduct): void {
    this._router.navigate(["../details", product.id], { relativeTo: this._activeRoute });
  }

}
