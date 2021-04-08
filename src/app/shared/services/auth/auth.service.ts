import { Injectable } from "@angular/core";

import { StorageEnum } from "../../enums";
import { IUser } from "../../interfaces";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  constructor() { }

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

}
