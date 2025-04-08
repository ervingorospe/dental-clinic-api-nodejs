import { UserRepository } from "@modules/user/repository"

export class UserService {
  static test() {
    return UserRepository.test();
  }
}