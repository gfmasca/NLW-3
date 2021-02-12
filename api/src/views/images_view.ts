import Image from '../database/entities/Image';

export interface IImageView {
  id: number,
  path: string;
}

export default {
  render(image: Image): IImageView {
    const {
      id, path,
    } = image;

    return {
      id,
      path: `http://localhost:3333/uploads/${path}`,
    };
  },

  renderMany(images: Image[]): IImageView[] {
    const images_views = images.map((image) => this.render(image));

    return images_views;
  },
};
