import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { NzModalRef } from "ng-zorro-antd/modal";

import { ApiService } from "src/app/core/services/api";
import { IUser } from "../../interfaces";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {

  constructor(
    private _modal: NzModalRef,
    private _fb: FormBuilder,
    private readonly _apiService: ApiService,
  ) { }

  validateForm!: FormGroup;
  private _users: Array<IUser> = [];
  randomUser!: IUser;
  errorMessage = "";

  ngOnInit(): void {
    this._initForm();
    this._getUsers();
  }

  private _initForm(): void {
    this.validateForm = this._fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  private async _getUsers(): Promise<void> {
    try {
      const users = await this._apiService.get("users").toPromise();
      this._users = users;
      this.randomUser = this._getRandomUser(users);
    } catch (error) {
    }
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      return this._login();
    }
    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  private _login(): void {
    const { username, password } = this.validateForm.value;
    const validate = this._users.find((user) => {
      return user.username === username && user.password === password;
    });
    if (!!validate) {
      return this._onSuccessLogin(validate);
    }
    this._setErrorMessage("Incorrect username or password");
  }

  private _onSuccessLogin(user: IUser): void {
    this._setErrorMessage("");
    return this._modal.destroy(user);
  }

  private _setErrorMessage(message: string): void {
    this.errorMessage = message;
  }

  private _getRandomUser(users: Array<IUser>): IUser {
    const random = Math.floor(Math.random() * 3);
    return users[random];
  }

}
