import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-star-rating",
  templateUrl: "./star-rating.component.html",
  styleUrls: ["./star-rating.component.scss"]
})
export class StarRatingComponent implements OnInit {

  constructor() { }

  private readonly _count = 5;
  private readonly _default = new Array(this._count).fill(false);

  @Input() input = 0;
  rating = this._default;

  ngOnInit(): void {
    const rating = [...new Array(this.input).fill(true), ...this._default];
    this.rating = rating.slice(0, this._count);
  }

}
