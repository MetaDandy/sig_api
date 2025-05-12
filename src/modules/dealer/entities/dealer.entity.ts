import { Route } from 'src/modules/route/entities/route.entity';
import { Vehicle } from 'src/modules/vehicle/entities/vehicle.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'dealer' })
export class Dealer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column({ unique: true })
  ci: string;

  @Column()
  active: boolean;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.dealer)
  vehicle: Relation<Vehicle[]>;

  @OneToMany(() => Route, (route) => route.dealer)
  route: Relation<Route[]>;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
