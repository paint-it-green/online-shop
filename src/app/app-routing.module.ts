import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

import { ProductComponent } from "./pages/product/product.component";
import { CartComponent } from "./pages/cart/cart.component";

const routes: Routes = [
  { path: "", redirectTo: "/product/list", pathMatch: "full" },
  {
    path: "product",
    component: ProductComponent,
    loadChildren: () =>
      import("./pages/product/product.module").then((m) => m.ProductModule),
  },
  {
    path: "cart",
    component: CartComponent,
    loadChildren: () =>
      import("./pages/cart/cart.module").then((m) => m.CartModule),
  },
];

export const components = [
  ProductComponent,
  CartComponent,
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
