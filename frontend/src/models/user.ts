export interface IUser {
  id: number;
  fullName: string;
  email: string;
  username: string;
}

class User {
  public data?: IUser;

  constructor(data?: IUser) {
    this.data = data;
  }

  get id(): number {
    return this.data?.id!;
  }
  get fullName(): string {
    return this.data?.fullName!;
  }
  get username(): string {
    return this.data?.username!;
  }
  get email(): string {
    return this.data?.email!;
  }
}

export default User;
