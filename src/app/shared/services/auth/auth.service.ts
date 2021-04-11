import { Injectable, ViewContainerRef } from "@angular/core";

import { NzModalService } from "ng-zorro-antd/modal";
import { Observable } from "rxjs";

import { StorageEnum } from "../../enums";
import { IUser } from "../../interfaces";
import { LoginComponent } from "../../modals/login/login.component";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  constructor(
    private _modal: NzModalService,
  ) { }

  setUser(user: IUser): void {
    sessionStorage.setItem(StorageEnum.USER, JSON.stringify(user));
  }

  getUser(): IUser {
    const user = sessionStorage.getItem(StorageEnum.USER) || "{}";
    return JSON.parse(user);
  }

  isLoggedIn(): boolean {
    const user = this.getUser();
    return !!user.id;
  }

  logout(): void {
    sessionStorage.removeItem(StorageEnum.USER);
  }

  login(nzViewContainerRef: ViewContainerRef): Observable<boolean> {

    return new Observable((subscribe) => {
      const modal = this._modal.create({
        nzTitle: "Login",
        nzFooter: null,
        nzMaskClosable: false,
        nzContent: LoginComponent,
        nzViewContainerRef
      });

      modal.afterClose
        .subscribe((result: IUser | undefined) => {
          if (result) {
            this.setUser(result);
          }
          subscribe.next(!!result);
          subscribe.complete();
        });
    })
  }

}
