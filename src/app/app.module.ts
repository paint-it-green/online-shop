import { NgModule } from "@angular/core";
import { registerLocaleData } from "@angular/common";
import en from "@angular/common/locales/en";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";

import { NZ_I18N, en_US } from "ng-zorro-antd/i18n";
import { NzButtonModule } from "ng-zorro-antd/button";

import { AppComponent } from "./app.component";

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzButtonModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
