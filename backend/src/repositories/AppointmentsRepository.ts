import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppoitmensRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  /**
   * name
   */
  public all(): Appointment[] {
    return this.appointments;
  }

  /**
   * Date verification method
   */
  public findByDate(date: Date): Appointment | null {
    const checkAppointments = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );

    return checkAppointments || null;
  }

  /**
   * Appoitment creation method
   */
  public create({ date, provider }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppoitmensRepository;
