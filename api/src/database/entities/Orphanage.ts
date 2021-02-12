import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orphanages')
export default class Orphanage {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  name: string;

  @Column('decimal', {
    transformer: {
      from(value) {
        return Number(value);
      },
      to(value) {
        return value;
      },
    },
  })
  latitude: number;

  @Column('decimal', {
    transformer: {
      from(value) {
        return Number(value);
      },
      to(value) {
        return value;
      },
    },
  })
  longitude: number;

  @Column()
  about: string;

  @Column()
  instructions: string;

  @Column()
  opening_hours: string;

  @Column()
  open_on_weekends: boolean;
}
