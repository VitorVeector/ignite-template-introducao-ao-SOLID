import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const pullUser = new User();

    const user = Object.assign(pullUser, {
      name,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(user);
    return user;
  }

  findById(id: string): User | undefined {
    const userById = this.users.find((user) => user.id === id);

    return userById;
  }

  findByEmail(email: string): User | undefined {
    const userByEmail = this.users.find((user) => user.email === email);

    return userByEmail;
  }

  turnAdmin(receivedUser: User): User {
    const user = receivedUser;
    if (user.admin === true) {
      throw new Error("This user already admin!");
    }

    user.admin = true;
    user.updated_at = new Date();

    return user;
  }

  list(): User[] {
    const { users } = this;
    return users;
  }
}

export { UsersRepository };
