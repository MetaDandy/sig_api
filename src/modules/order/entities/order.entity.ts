import { Client } from "src/modules/client/entities/client.entity";
import { Delivery } from "src/modules/delivery/entities/delivery.entity";
import { DetailOrder } from "src/modules/detail_order/entities/detail_order.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from "typeorm";

@Entity({ name: "order" })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  total: number;

  @Column()
  state: boolean;

  @Column()
  ubication: string;

  @Column()
  estimated_delivery: Date;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  latitude: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  length: number;

  @OneToMany(()=> Delivery, (delivery)=> delivery.order)
  delivery: Relation<Delivery[]>;

  @ManyToOne(()=> DetailOrder, (order_detail) => order_detail.order)
  order_detail: Relation<DetailOrder>;

  @ManyToOne(()=> Client, (client) => client.order)
  client: Relation<Client>;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
