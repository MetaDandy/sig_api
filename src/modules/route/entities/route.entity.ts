
import { Dealer } from "src/modules/dealer/entities/dealer.entity";
import { Delivery } from "src/modules/delivery/entities/delivery.entity";
import {Entity,Column,PrimaryGeneratedColumn,ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn,OneToMany, Relation} from "typeorm"

@Entity()
export class Route {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('date')
    date:Date;

    @Column('time')
    hour_start: string;

    @Column('time')
    hour_end: string;

    @Column('text')
    polyline: string;

    @Column()
    delivery_quantity: number;


    @Column()
    total_distance: number;

    @ManyToOne(()=> Dealer, (dealer)=>dealer.route, {eager:true}  )
    dealer: Relation<Dealer>


    @OneToMany(()=> Delivery, delivery=> delivery.route )
    delivery: Relation<Delivery[]>;

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  
    @DeleteDateColumn()
    deleted_at: Date;
}
