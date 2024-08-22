import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
//Luego de ver como guardar información y recuperarla en un método, crearé una nueva entidad
//que sea tipo de cliente. De esa forma puedo tener un ejemplo de distintas tablas relacionadas
@Entity()
export class Customer{
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'customer_id'
    })
    id:number;

    @Column({
        nullable: false,
        default: ''
    })
    name: string;

    @Column({
        name: 'email_address',
        nullable: false,
        default: ''
    })
    emailAddress: string;

    @Column({
        nullable: false,
        default: ''
    })
    line1: string;

    @Column({
        nullable: true,
        default: ''
    })
    line2: string;

    @Column({
        nullable: false,
        default: ''
    })
    city: string;

    @Column({
        nullable: false,
        default: ''
    })
    state: string;

}