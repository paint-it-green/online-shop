import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProductListComponent } from "./product-list/product-list.component";
import { ProductCategoryComponent } from "./product-category/product-category.component";
import { ProductDetailsComponent } from "./product-details/product-details.component";

const routes: Routes = [
  { path: "", redirectTo: "list" },
  { path: "list", component: ProductListComponent, },
  { path: "category", component: ProductCategoryComponent, },
  { path: "details/:id", component: ProductDetailsComponent, },
];

export const components = [
  ProductListComponent,
  ProductCategoryComponent,
  ProductDetailsComponent,
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule { }
