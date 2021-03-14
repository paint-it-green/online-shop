import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { ApiService } from "src/app/core/services/api";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"]
})
export class CategoryComponent implements OnInit {

  constructor(
    private readonly _activeRoute: ActivatedRoute,
    private readonly _apiService: ApiService,
  ) { }
  @Output() onSelectCategory = new EventEmitter<string>();

  categories = [] as Array<string>;
  selectedCategory = "all";
  categoryLoader = true;

  ngOnInit(): void {
    this._getCategories();
    this._setActive();
  }

  private async _getCategories(): Promise<void> {
    try {
      const categories = await this._apiService.get("productCategories").toPromise();
      this.categories = ["all", ...categories];
      this.categoryLoader = false;
    } catch (error) {
      this.categoryLoader = false;
    }
  }

  selectCategory(category: string, emit = true): void {
    if (this.selectedCategory !== category) {
      this.selectedCategory = category;
      if (emit) {
        this.onSelectCategory.emit(category);
      }
    }
  }

  private _setActive(): void {
    const category = this._activeRoute.snapshot.paramMap.get("category");
    const active = category ? category.toLowerCase() : "all";
    this.selectCategory(active, false);
  }

}
