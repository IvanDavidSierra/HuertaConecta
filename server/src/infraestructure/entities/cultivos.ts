import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ schema:'huertaconecta', name: 'cultivos' })
export class CultivosEntity {
  @PrimaryGeneratedColumn()
    id_cultivo: number;

  @Column({ type: 'varchar', length: 50 })
    titulo_cultivo: string;

  @Column({ type: 'varchar', length: 255 })
    descripcion_cultivo: string;
}