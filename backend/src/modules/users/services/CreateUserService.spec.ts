import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to create a new user', async () => {
    const user = await createUser.run({
      name: 'Tester',
      email: 'tester@admin.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user whith same email from another', async () => {
    await createUser.run({
      name: 'Tester',
      email: 'tester@admin.com',
      password: '12345678',
    });

    await expect(
      createUser.run({
        name: 'Tester',
        email: 'tester@admin.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
