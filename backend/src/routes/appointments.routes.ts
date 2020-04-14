import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';

// Models
import Appointment from '../models/Appointment';

const appointmentsRouter = Router();

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const checkAppointments = appointments.find(appointment =>
    isEqual(parsedDate, appointment.date),
  );

  if (checkAppointments) {
    return response
      .status(400)
      .json({ message: '💈️ Appointment is alredy booked' });
  }

  const appointment = new Appointment(provider, parsedDate);
  appointments.push(appointment);

  return response.json(appointment);
});

export default appointmentsRouter;
