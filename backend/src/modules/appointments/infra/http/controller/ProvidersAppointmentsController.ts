import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListProviderAppointmentsServices from '@modules/appointments/services/ListProviderAppointmentsServices';

export default class ProvidersAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { day, month, year } = request.query;

    const listProviderAppointments = container.resolve(
      ListProviderAppointmentsServices,
    );
    const appointments = await listProviderAppointments.run({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });
    return response.json(appointments);
  }
}
