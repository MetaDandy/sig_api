import { Dealer } from "src/modules/dealer/entities/dealer.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";

@Entity({ name: "vehicle" })
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column({ unique: true })
  badge: string;

  @Column()
  model: string;

  @Column()
  brand: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  capacity_kg: number;

  @Column({ nullable: true })
  photo: string;

  @Column()
  active: boolean;

  @ManyToOne(() => Dealer, (dealer) => dealer.vehicle)
  dealer: Relation<Dealer>;

  @CreateDateColumn()
  created_at: Date; 

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
