import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgZorroAntdModule } from "./ng-zorro-antd.module";
import { SearchbarComponent } from "./components/searchbar/searchbar.component";
import { StarRatingComponent } from "./components/star-rating/star-rating.component";
import { ProductItemComponent } from "./components/product-item/product-item.component";
import { CategoryComponent } from "./components/category/category.component";
import { ProductSkeletonComponent } from "./components/product-skeleton/product-skeleton.component";
import { LoginComponent } from "./modals/login/login.component";

const components = [
  SearchbarComponent,
  StarRatingComponent,
  ProductItemComponent,
  CategoryComponent,
  ProductSkeletonComponent,
  LoginComponent
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule
  ],
  exports: [
    ...components,
    NgZorroAntdModule,
  ],
})
export class SharedModule { }
