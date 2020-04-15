import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppontmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public run({ date, provider }: Request): Appointment {
    const appointmentDate = startOfHour(date);

    const checkAppointmentsinSameDate = this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (checkAppointmentsinSameDate) {
      throw Error('💈️ Appointment is alredy booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });
    return appointment;
  }
}
export default CreateAppontmentService;
