import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Orphanage from '../database/entities/Orphanage';
import orphanage_view from '../views/orphanage_view';

export default class OrphanagesController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images'],
    });

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

    const orphanage = orphanageRepository.create({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images,
    });

    await orphanageRepository.save(orphanage);

    return res.status(201).json(orphanage_view.render(orphanage));
  }
}
