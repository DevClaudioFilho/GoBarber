import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersServices from './ListProvidersServices';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersServices;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersServices(fakeUsersRepository);
  });

  it('should be able to show profile', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Tester',
      email: 'tester@admin.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Tester2',
      email: 'tester2@admin.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Barber',
      email: 'Barber@admin.com',
      password: '123456',
    });

    const providers = await listProviders.run({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
