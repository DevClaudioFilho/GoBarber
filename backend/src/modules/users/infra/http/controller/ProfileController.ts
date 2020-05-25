import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { Exclude, Expose, classToClass } from 'class-transformer';

import UpdateProfileServices from '@modules/users/services/UpdateProfileServices';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.run({ user_id });

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.user.id;
    const { email, password, old_password, name } = request.body;

    const updateProfile = container.resolve(UpdateProfileServices);

    const user = await updateProfile.run({
      user_id,
      email,
      password,
      old_password,
      name,
    });

    return response.json(classToClass(user));
  }
}
