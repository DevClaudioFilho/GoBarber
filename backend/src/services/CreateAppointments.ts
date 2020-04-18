import 'reflect-metadata';
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppontmentService {
  public async run({ date, provider }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointmentDate = startOfHour(date);

    const checkAppointmentsinSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (checkAppointmentsinSameDate) {
      throw Error('💈️ Appointment is alredy booked');
    }

    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);
    return appointment;
  }
}
export default CreateAppontmentService;
