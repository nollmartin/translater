export class User {
  name: string;
  email: string;
  dataPolicy: boolean;
  tel: string;

  constructor(name: string, email: string, dataPolicy: boolean, tel: string) {
    this.name = name;
    this.email = email;
    this.dataPolicy = dataPolicy;
    this.tel = tel;
  }
}
