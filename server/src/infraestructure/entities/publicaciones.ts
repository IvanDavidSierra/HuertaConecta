import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { usuarios_huertas } from './usuarios_huertas';

@Entity({ schema: 'huertaconecta', name: 'publicaciones' })
export class publicaciones {
    @PrimaryGeneratedColumn()
    id_publicacion: number;

    @Column({ type: 'varchar', length: 200 })
    titulo_post: string;

    @Column({ type: 'text' })
    contenido_post: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fecha_post: Date;

    @Column()
    id_usuarios_huertas: number;

    @ManyToOne(() => usuarios_huertas, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_usuarios_huertas' })
    usuarios_huertas: usuarios_huertas;
} 