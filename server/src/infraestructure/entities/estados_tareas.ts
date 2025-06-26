import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ schema: 'huertaconecta', name: 'estados_tareas' })
export class EstadoTareaEntity {
    @PrimaryGeneratedColumn()
    id_estado_tarea: number;

    @Column({ type: 'varchar', length: 50 })
    descripcion_estado_tarea: string;
}