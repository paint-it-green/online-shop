import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { ApiService } from "src/app/core/services/api";
import { IProduct } from "src/app/shared/interfaces";

@Component({
  selector: "app-product-category",
  templateUrl: "./product-category.component.html",
  styleUrls: ["./product-category.component.scss"]
})
export class ProductCategoryComponent implements OnInit {

  constructor(
    private readonly _activeRoute: ActivatedRoute,
    private readonly _router: Router,
    private readonly _apiService: ApiService,
  ) { }

  products = [] as Array<IProduct>;
  skeletonCount = 6;
  productLoader = true;
  activeCategory = "";

  ngOnInit(): void {
    this._getProducts();
  }

  private async _getProducts(): Promise<void> {
    try {
      this.productLoader = true;
      const { endpoint, pathVars } = this._getEndPoint();
      const products = await this._apiService.get(endpoint, { pathVars }).toPromise();
      this.products = products;
      this.productLoader = false;
    } catch (error) {
      this.productLoader = false;
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

  private _getEndPoint(): { endpoint: string, pathVars: {} } {
    const category = this._getCategory();
    const productAll = {
      endpoint: "products",
      pathVars: {}
    };
    const productCategory = {
      endpoint: "productCategory",
      pathVars: { category }
    };
    return (category === "all") ? productAll
      : productCategory;
  }

  private _hasCategoryParam(): boolean {
    return this._activeRoute.snapshot.paramMap.get("category") ? true : false;
  }

  private _getCategory(): string {
    if (!this.activeCategory) {
      const category = this._activeRoute.snapshot.paramMap.get("category");
      this.activeCategory = category ? category.toLowerCase() : "all";
    }
    return this.activeCategory;
  }

}
