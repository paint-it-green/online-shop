import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NgZorroAntdModule } from "./ng-zorro-antd.module";
import { SearchbarComponent } from "./searchbar/searchbar.component";

const components = [
  SearchbarComponent,
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule
  ],
  exports: [
    ...components,
    NgZorroAntdModule,
  ],
})
export class SharedModule { }
