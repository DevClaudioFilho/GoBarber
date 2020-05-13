import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able create a new appointment', async () => {
    const appointment = await createAppointment.run({
      date: new Date(),
      provider_id: '123456789',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456789');
  });

  it('should not be able to create two appointment on the same time', async () => {
    const appointmentDate = new Date(2020, 4, 11, 11);

    await createAppointment.run({
      date: appointmentDate,
      provider_id: '123456789',
    });
    expect(
      createAppointment.run({
        date: appointmentDate,
        provider_id: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
