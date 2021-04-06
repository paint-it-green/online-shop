import { Injectable } from "@angular/core";

import { IProduct } from "../../interfaces";

@Injectable({
  providedIn: "root"
})
export class ProductService {

  constructor() { }

  addCustomDetails(item: IProduct): IProduct {
    item.totalSold = `${((Math.random() * 9) + 1).toFixed(1)}K`;
    item.rating = Math.ceil(Math.random() * 5);
    return item;
  }
}
