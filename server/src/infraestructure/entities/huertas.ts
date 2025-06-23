import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'huertas' })
export class huertas {  

    @PrimaryGeneratedColumn()
    id_huerta: number;

    @Column()
    nombre_huerta: string;

    @Column()
    descripcion: string;

    @Column()
    direccion_huerta: string;

    @Column()
    fecha_creacion: Date;

}