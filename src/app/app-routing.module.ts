import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

import { ProductComponent } from "./pages/product/product.component";

const routes: Routes = [
  { path: "", redirectTo: "/product/list", pathMatch: "full" },
  {
    path: "product",
    component: ProductComponent,
    data: { breadcrumb: "Products" },
    loadChildren: () =>
      import("./pages/product/product.module").then((m) => m.ProductModule),
  },
];

export const components = [
  ProductComponent,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: "top",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
