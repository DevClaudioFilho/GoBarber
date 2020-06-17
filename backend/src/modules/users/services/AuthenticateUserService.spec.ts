import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    await fakeUsersRepository.create({
      name: 'Tester',
      email: 'tester@admin.com',
      password: '123456',
    });

    const response = await authenticateUser.run({
      email: 'tester@admin.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
  });

  it('should not be able to authenticate whith non exiting user', async () => {
    await expect(
      authenticateUser.run({
        email: 'teste@admin.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate whith non existing user', async () => {
    await fakeUsersRepository.create({
      name: 'Tester',
      email: 'tester@admin.com',
      password: '123456',
    });
    await expect(
      authenticateUser.run({
        email: 'tester@admin.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
