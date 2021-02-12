import { Router } from 'express';
import OrphanagesController from '../controllers/OrphanagesController';

const orphanageRouter = Router();

const orphanagesController = new OrphanagesController();

orphanageRouter.post('/', orphanagesController.create);

export default orphanageRouter;
