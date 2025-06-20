import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    lastName: string;

    @Column()
    idTipoUsuario: number;

    @Column()
    creationDate: Date;

    @Column()
    actualizationDate: Date;
}