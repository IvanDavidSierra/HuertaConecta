import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class TipoUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
} 