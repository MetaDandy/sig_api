import { DetailOrder } from 'src/modules/detail_order/entities/detail_order.entity';
import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, UpdateDateColumn, CreateDateColumn, OneToMany, Relation } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ default: true })
  active: boolean;

  @Column()
  stock: number;

  @Column({ nullable: true })
  image: string;

  @Column({ length: 255 })
  category: string;

  @Column({ length: 100, nullable: true })
  color: string;

  @Column({ length: 100, nullable: true })
  size: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: true })
  description: string;

  @OneToMany(()=> DetailOrder, (detail_order)=> detail_order.product)
  order_detail: Relation<DetailOrder[]>;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
