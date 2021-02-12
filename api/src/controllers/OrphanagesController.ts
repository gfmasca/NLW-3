import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Orphanage from '../database/entities/Orphanage';
import AppError from '../errors/AppError';
import orphanage_view from '../views/orphanage_view';

export default class OrphanagesController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOne(id, {
      relations: ['images'],
    });

    if (!orphanage) throw new AppError('Orphanage not found');

    return res.json(orphanage_view.render(orphanage));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const orphanageRepository = getRepository(Orphanage);

    const orphanages = await orphanageRepository.find({
      relations: ['images'],
    });

    return res.json(orphanage_view.renderMany(orphanages));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = req.body;

    const files = req.files as Express.Multer.File[];
    const images = files.map((file) => ({ path: file.filename }));

    const orphanageRepository = getRepository(Orphanage);

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        }),
      ),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const orphanage = orphanageRepository.create();

    await orphanageRepository.save(orphanage);

    return res.status(201).json(orphanage_view.render(orphanage));
  }
}
