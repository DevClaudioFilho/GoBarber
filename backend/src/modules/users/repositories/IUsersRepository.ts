import User from '../infra/typeorm/entities/User';

import ICreateUsersDTO from '../dtos/ICreateUsersDTO';

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  save(user: User): Promise<User>;
  create(data: ICreateUsersDTO): Promise<User>;
}
