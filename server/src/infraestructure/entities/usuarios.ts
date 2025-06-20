import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { tipos_usuarios } from './tipos_usuario';

@Entity({ name: 'usuarios' })
export class usuarios {

    @PrimaryGeneratedColumn()
    id_usuario: number;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column()
    correo: string;

    @Column()
    contrasena: string;

    @ManyToOne(() => tipos_usuarios, (tipo_usuario) => tipo_usuario.usuarios, { eager: true })
    @JoinColumn({ name: 'id_tipo_usuario' })
    tipo_usuario: tipos_usuarios;

    @Column()
    fecha_creacion: Date;
}