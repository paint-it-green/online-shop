import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CartListComponent } from "./cart-list/cart-list.component";

const routes: Routes = [
  { path: "", redirectTo: "list" },
  { path: "list", component: CartListComponent, },
];

export const components = [
  CartListComponent,
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartRoutingModule { }
