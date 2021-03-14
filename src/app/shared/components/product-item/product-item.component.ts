import { Component, Input, OnInit } from "@angular/core";

import { IProduct } from "src/app/core/interface";

@Component({
  selector: "app-product-item",
  templateUrl: "./product-item.component.html",
  styleUrls: ["./product-item.component.scss"]
})
export class ProductItemComponent implements OnInit {

  constructor() { }

  @Input()
  item!: IProduct;

  ngOnInit(): void {
    this.item = this._addCustomDetails(this.item);
  }

  private _addCustomDetails(item: IProduct): IProduct {
    item.totalSold = `${((Math.random() * 9) + 1).toFixed(1)}K`;
    item.rating = Math.ceil(Math.random() * 5);
    return item;
  }

}
