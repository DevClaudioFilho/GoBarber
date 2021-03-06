import User from '../infra/typeorm/entities/User';

import ICreateUsersDTO from '../dtos/ICreateUsersDTO';
import IFindAllProvidersDTO from '../dtos/IFindAllPovidersDTO';

export default interface IUsersRepository {
  findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  save(user: User): Promise<User>;
  create(data: ICreateUsersDTO): Promise<User>;
}
