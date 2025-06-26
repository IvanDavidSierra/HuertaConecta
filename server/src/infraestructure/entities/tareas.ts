import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { EstadoTareaEntity } from "./estados_tareas";
import { CultivosEntity } from "./cultivos";
import { usuarios_huertas } from "./usuarios_huertas";

@Entity({ schema: 'huertaconecta', name: 'tareas' })
export class TareasEntity {
  @PrimaryGeneratedColumn()
  id_tarea: number;

  @Column({ type: 'varchar', length: 100 })
  titulo_tarea: string;

  @Column({ type: 'varchar', length: 500 })
  descripcion_tarea: string;

  @Column({ type: 'date' })
  fecha_inicio_tarea: Date;

  @Column({ type: 'date' })
  fecha_fin_tarea: Date;

  @Column()
  id_estado_tarea: number;

  @Column()
  id_cultivo: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  @Column()
  id_usuarios_huertas: number;

  // Relaciones
  @ManyToOne(() => EstadoTareaEntity)
  @JoinColumn({ name: 'id_estado_tarea' })
  estado_tarea: EstadoTareaEntity;

  @ManyToOne(() => CultivosEntity)
  @JoinColumn({ name: 'id_cultivo' })
  cultivo: CultivosEntity;

  @ManyToOne(() => usuarios_huertas)
  @JoinColumn({ name: 'id_usuarios_huertas' })
  usuario_huerta: usuarios_huertas;
}