import { Order } from 'src/modules/order/entities/order.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import {ManyToOne, Entity,PrimaryGeneratedColumn,Column, Relation } from 'typeorm'

@Entity()
export class DetailOrder {
    @PrimaryGeneratedColumn('uuid')
    id:number;

    @Column()
    amount:number;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    unit_price : number;

    @Column()
    delivery_address: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    sub_total: number;

    @ManyToOne(()=> Order, (order) => order.order_detail)
    order: Relation<Order[]>;

    @ManyToOne(()=> Product, (product) => product.order_detail)
    product: Relation<Product>;
}
