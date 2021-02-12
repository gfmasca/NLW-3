import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';

import OrphanagesController from '../controllers/OrphanagesController';

const upload = multer(uploadConfig);

const orphanageRouter = Router();

const orphanagesController = new OrphanagesController();

orphanageRouter.post('/', upload.array('images'), orphanagesController.create);
orphanageRouter.get('/', orphanagesController.index);
orphanageRouter.get('/:id', orphanagesController.show);

export default orphanageRouter;
