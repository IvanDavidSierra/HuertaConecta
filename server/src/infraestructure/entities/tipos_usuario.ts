import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { usuarios } from './usuarios';

@Entity({ name: 'tipos_usuarios' })
export class tipos_usuarios {
    @PrimaryGeneratedColumn()
    id_tipo_usuario: number;
    
    @Column()
    descripcion_tipo_usuario: string;

    @OneToMany(() => usuarios, (usuario) => usuario.tipo_usuario)
    usuarios: usuarios[];
} 