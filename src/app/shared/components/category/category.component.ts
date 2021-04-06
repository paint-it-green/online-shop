import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { ApiService } from "src/app/core/services/api";

type CategoryTile = { name: string, icon: string };

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

  @Input() type: "tile" | "sidebar" | undefined;
  @Output() onSelectCategory = new EventEmitter<string>();

  categories = [] as Array<any>;
  selectedCategory = "all";
  isLoading = true;
  private readonly _icons = [
    "assets/svg/cpu.svg",
    "assets/svg/necklace.svg",
    "assets/svg/male-clothes.svg",
    "assets/svg/cocktail-dress.svg"
  ];

  ngOnInit(): void {
    this._getCategories();
    this._setActive();
  }

  private async _getCategories(): Promise<void> {
    try {
      const categories = await this._apiService.get("productCategories").toPromise();
      this.categories = this.type === "tile" ? this._getCategoryAsTile(categories) : ["all", ...categories];
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
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
    if (this.type === "sidebar") {
      const category = this._activeRoute.snapshot.queryParamMap.get("category");
      const active = category ? category.toLowerCase() : "all";
      this.selectCategory(active, false);
    }
  }

  private _getCategoryAsTile(categories: Array<string>): Array<CategoryTile> {
    return categories.map((category, index) => {
      return {
        name: category,
        icon: this._icons[index]
      };
    });
  }

}
