import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppontmentService from '../services/CreateAppointments';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
  const appoitmens = appointmentsRepository.all();

  return response.json(appoitmens);
});
appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppontment = new CreateAppontmentService(
      appointmentsRepository,
    );

    const appointment = createAppontment.run({
      date: parsedDate,
      provider,
    });
    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
