import { Dealer } from "src/modules/dealer/entities/dealer.entity";
import { Order } from "src/modules/order/entities/order.entity";
import { Route } from "src/modules/route/entities/route.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, Relation, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'delivery' })
export class Delivery {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    comment: string

    @Column()
    order_delivery: number

    @Column()
    state: string

    @Column()
    location_delivery: string

    @Column()
    payment_type: string

    @Column()
    delivery_date: Date  //fecha entrega real

    @Column({ type: "decimal", precision: 10, scale: 2 })
    latitude: number;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    length: number;

    @ManyToOne(()=> Route, (route)=> route.delivery)
    route: Relation<Route>;

    @ManyToOne(()=> Order, (order)=> order.delivery)
    order: Relation<Order>;

    @CreateDateColumn()
    created_at: Date;  // fecha asignacion

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}
