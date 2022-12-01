export class User {
  name: string;
  email: string;
  dataPolicy: boolean;

  constructor(name: string, email: string, dataPolicy: boolean) {
    this.name = name;
    this.email = email;
    this.dataPolicy = dataPolicy;
  }
}
