export interface IUser {
  id: number;
  username: string;
  password: string;
  email: string;
  phone: string;
  address: IUserAddress;
  name: IUserName;
}

export interface IUserName {
  firstname: string;
  lastname: string;
}

export interface IUserAddress {
  geolocation: IUserAddressGeoLocation;
  city: string;
  street: string;
  number: number;
  zipcode: string;
}

export interface IUserAddressGeoLocation {
  lat: string;
  long: string;
}
