import Orphanage from '../database/entities/Orphanage';
import imageView, { IImageView } from './images_view';

interface IOrphanageView {
  id: number,
  name: string,
  longitude: number,
  latitude: number,
  instructions: string,
  about: string,
  open_on_weekends: boolean,
  opening_hours: string,
  images: IImageView[]
}

export default {
  render(orphanage: Orphanage): IOrphanageView {
    const {
      id, name, longitude, latitude, instructions, about, open_on_weekends, opening_hours, images,
    } = orphanage;

    return {
      id,
      latitude,
      longitude,
      name,
      open_on_weekends,
      opening_hours,
      about,
      instructions,
      images: imageView.renderMany(images),
    } as IOrphanageView;
  },

  renderMany(orphanages: Orphanage[]): IOrphanageView[] {
    const orphanages_views = orphanages.map((orphanage) => this.render(orphanage));

    return orphanages_views;
  },
};
