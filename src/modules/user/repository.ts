import { IUser } from '@modules/user/interface';

export class UserRepository {
  static test() {
    return 'testing lang';
  }

  static async create(userData: IUser) {
    // return await UserModel.create(userData);
  }
}