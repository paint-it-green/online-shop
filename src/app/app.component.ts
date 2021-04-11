import { Component, OnInit, ViewContainerRef } from "@angular/core";

import { NzModalService } from "ng-zorro-antd/modal";
import { IUser } from "./shared/interfaces";

import { LoginComponent } from "./shared/modals/login/login.component";
import { AuthService } from "./shared/services";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {

  constructor(
    private _modal: NzModalService,
    private _viewContainerRef: ViewContainerRef,
    private _authService: AuthService,
  ) { }

  title = "online-shop";
  user!: IUser;
  isLoggedIn!: boolean;

  ngOnInit(): void {
    this._initData();
  }

  private _initData(): void {
    this.user = this._authService.getUser();
    this.isLoggedIn = this._authService.isLoggedIn();
  }

  login(): void {
    const modal = this._modal.create({
      nzTitle: "Login",
      nzFooter: null,
      nzMaskClosable: false,
      nzContent: LoginComponent,
      nzViewContainerRef: this._viewContainerRef
    });

    modal.afterClose
      .subscribe(result => {
        if (result) {
          return this._initData();
        }
      });
  }

  logout(): void {
    this._authService.logout();
    return this._initData();
  }

}
