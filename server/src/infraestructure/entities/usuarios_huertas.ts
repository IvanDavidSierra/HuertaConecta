import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { usuarios } from './usuarios';
import { huertas } from './huertas';

@Entity({ schema: 'huertaconecta', name: 'usuarios_huertas' })
export class usuarios_huertas {
  @PrimaryGeneratedColumn()
  id_usuarios_huertas: number;

  @Column()
  id_usuario: number;

  @Column()
  id_huerta: number;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  fecha_vinculacion: Date;

  @ManyToOne(() => usuarios, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_usuario' })
  usuario: usuarios;

  @ManyToOne(() => huertas, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_huerta' })
  huerta: huertas;
}
