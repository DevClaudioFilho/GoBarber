import Appointment from '../infra/typeorm/entities/Appointment';

import IFindAllInMonthFromProvider from '../dtos/IFindAllInMonthFromProvider';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentsDTO';
import IFindAllInDayFromProvider from '../dtos/IFindAllInDayFromProvider';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;

  findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>;

  findAllInMonthFromProvider(
    data: IFindAllInMonthFromProvider,
  ): Promise<Appointment[]>;

  findAllInDayFromProvider(
    data: IFindAllInDayFromProvider,
  ): Promise<Appointment[]>;
}
