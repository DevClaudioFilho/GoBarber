import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProviderController from '../controller/ProviderController';
import ProviderMonthAvailabilityCrontroller from '../controller/ProviderMonthAvailabilityCrontroller';
import ProviderDayAvailabilityCrontroller from '../controller/ProviderDayAvailabilityCrontroller';

const providersRouter = Router();

const providerController = new ProviderController();
const providerMonthAvailabilityCrontroller = new ProviderMonthAvailabilityCrontroller();
const providerDayAvailabilityCrontroller = new ProviderDayAvailabilityCrontroller();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providerController.index);

providersRouter.get(
  '/:provider_id/month-availability',
  providerMonthAvailabilityCrontroller.index,
);

providersRouter.get(
  '/:provider_id/day-availability',
  providerDayAvailabilityCrontroller.index,
);

export default providersRouter;
