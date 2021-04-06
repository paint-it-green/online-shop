import { Component, Input, OnInit } from "@angular/core";

import { IProduct } from "../../interfaces";
import { ProductService } from "../../services";

@Component({
  selector: "app-product-item",
  templateUrl: "./product-item.component.html",
  styleUrls: ["./product-item.component.scss"]
})
export class ProductItemComponent implements OnInit {

  constructor(
    private _productService: ProductService
  ) { }

  @Input()
  item!: IProduct;

  ngOnInit(): void {
    this.item = this._productService.addCustomDetails(this.item);
  }

}
