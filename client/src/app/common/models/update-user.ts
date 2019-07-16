import { User } from './user';

export class UpdateUser {
  constructor(public id?: string,
              public name?: string,
              public login?: string,
              public city?: string,
              public contact?: string,) {
  }

  mapUser(user: User): void {
    this.id = user._id;
    this.name = user.name;
    this.login = user.login;
    this.city = user.city;
    this.contact = user.contact;
  }
}
