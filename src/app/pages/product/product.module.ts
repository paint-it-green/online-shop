import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProductRoutingModule, components } from "./product-routing.module";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
  ]
})
export class ProductModule { }
