import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../database/entities/Orphanage';

export default class OrphanagesController {
  public async index(req: Request, res: Response): Promise<Response> {
    const orphanageRepository = getRepository(Orphanage);

    const orphanages = await orphanageRepository.find();

    console.log(typeof orphanages[0].latitude);

    return res.json(orphanages);
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

    const orphanageRepository = getRepository(Orphanage);

    const orphanage = orphanageRepository.create({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    });

    await orphanageRepository.save(orphanage);

    return res.status(201).json(orphanage);
  }
}
