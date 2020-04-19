import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import AppError from '../errors/AppError';

import uploadConfig from '../config/upload';
import User from '../models/User';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserService {
  public async run({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepsitory = await getRepository(User);

    const user = await usersRepsitory.findOne(user_id);

    if (!user) {
      throw new AppError('💈️Only authenticate can change avatar', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarfileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarfileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await usersRepsitory.save(user);

    return user;
  }
}

export default UpdateUserService;
