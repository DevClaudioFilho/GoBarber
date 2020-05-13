import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });
  it('should be able to update avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Tester',
      email: 'tester@admin.com',
      password: '123456',
    });
    await updateUserAvatar.run({
      user_id: user.id,
      avatarFilename: 'teste.png',
    });

    expect(user.avatar).toBe('teste.png');
  });

  it('should not be able to update avatar from non exist user', async () => {
    await expect(
      updateUserAvatar.run({
        user_id: 'non-exiting-user',
        avatarFilename: 'teste.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete olf avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'Tester',
      email: 'tester@admin.com',
      password: '123456',
    });

    await updateUserAvatar.run({
      user_id: user.id,
      avatarFilename: 'teste.png',
    });

    await updateUserAvatar.run({
      user_id: user.id,
      avatarFilename: 'newTeste.png',
    });

    expect(deleteFile).toHaveBeenCalledWith('teste.png');

    expect(user.avatar).toBe('newTeste.png');
  });
});
