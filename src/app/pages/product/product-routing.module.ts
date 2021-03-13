import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProductDetailsComponent } from "./product-details/product-details.component";
import { ProductListComponent } from "./product-list/product-list.component";

const routes: Routes = [
  { path: "", component: ProductListComponent, },
  {
    path: "details/:id", component: ProductDetailsComponent,
    data: { breadcrumb: "Details" },
  },
];

export const components = [
  ProductListComponent,
  ProductDetailsComponent
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule { }
