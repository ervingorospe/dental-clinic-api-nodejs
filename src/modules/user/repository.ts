import { IUser } from '@modules/user/interface';

export class UserRepository {
  static test() {
    return 'Welcome Ervin Gorospe';
  }

  static async create(userData: IUser) {
    // return await UserModel.create(userData);
  }
}