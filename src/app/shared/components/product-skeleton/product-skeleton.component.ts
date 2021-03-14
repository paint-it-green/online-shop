import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-product-skeleton",
  templateUrl: "./product-skeleton.component.html",
  styleUrls: ["./product-skeleton.component.scss"]
})
export class ProductSkeletonComponent implements OnInit {

  constructor() { }

  @Input() count = 1;
  skeletons = [] as Array<boolean>;

  ngOnInit(): void {
    this.skeletons = new Array(this.count).fill(true);
  }

}
