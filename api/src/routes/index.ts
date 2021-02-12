import { Router } from 'express';

import orphanageRouter from './orphanage.router';

const routes = Router();

routes.use('/orphanages', orphanageRouter);

export default routes;
