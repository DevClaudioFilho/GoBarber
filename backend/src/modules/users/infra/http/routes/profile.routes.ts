import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import ProfileController from '../controller/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);
profileRouter.put('/', profileController.update);

export default profileRouter;
