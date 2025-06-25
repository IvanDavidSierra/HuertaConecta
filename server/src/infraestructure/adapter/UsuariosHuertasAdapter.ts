import { UsuariosHuertasPort } from "../../domain/usuarios_huertas_port";
import { UsuariosHuertas as UsuariosHuertasDomain } from "../../domain/usuarios_huertas";
import { usuarios_huertas as UsuariosHuertasEntities } from "../entities/usuarios_huertas";
import { AppDataSource } from "../config/data-base";
import { Repository } from "typeorm";

export class UsuariosHuertasAdapter implements UsuariosHuertasPort {
    private usuariosHuertasRepository: Repository<UsuariosHuertasEntities>;

    constructor() {
        this.usuariosHuertasRepository = AppDataSource.getRepository(UsuariosHuertasEntities);
    }

    private toDomain(usuariosHuertas: UsuariosHuertasEntities): UsuariosHuertasDomain {
        return {
            id_usuarios_huertas: usuariosHuertas.id_usuarios_huertas,
            id_usuario: {
                id_usuario: usuariosHuertas.usuario.id_usuario,
                nombre: usuariosHuertas.usuario.nombre,
                apellido: usuariosHuertas.usuario.apellido,
                correo: usuariosHuertas.usuario.correo,
                contrasena: usuariosHuertas.usuario.contrasena,
                id_tipo_usuario: usuariosHuertas.usuario.tipo_usuario,
                fecha_creacion: usuariosHuertas.usuario.fecha_creacion
            },
            id_huerta: {
                id_huerta: usuariosHuertas.huerta.id_huerta,
                nombre_huerta: usuariosHuertas.huerta.nombre_huerta,
                direccion_huerta: usuariosHuertas.huerta.direccion_huerta,
                descripcion: usuariosHuertas.huerta.descripcion,
                fecha_creacion: usuariosHuertas.huerta.fecha_creacion
            },
            fecha_vinculacion: usuariosHuertas.fecha_vinculacion
        };
    }

    private toEntity(usuariosHuertas: Omit<UsuariosHuertasDomain, "id_usuarios_huertas">): UsuariosHuertasEntities {
        const entity = new UsuariosHuertasEntities();
        entity.id_usuario = usuariosHuertas.id_usuario.id_usuario;
        entity.id_huerta = usuariosHuertas.id_huerta.id_huerta;
        entity.fecha_vinculacion = usuariosHuertas.fecha_vinculacion;
        return entity;
    }

    async createUsuariosHuertas(usuariosHuertas: Omit<UsuariosHuertasDomain, 'id_usuarios_huertas'>): Promise<number> {
        const newEntity = this.toEntity(usuariosHuertas);
        const savedEntity = await this.usuariosHuertasRepository.save(newEntity);
        return savedEntity.id_usuarios_huertas;
    }

    async updateUsuariosHuertas(id: number, usuariosHuertas: Partial<UsuariosHuertasDomain>): Promise<boolean> {
        const existingEntity = await this.usuariosHuertasRepository.findOne({ where: { id_usuarios_huertas: id } });
        if (!existingEntity) return false;

        Object.assign(existingEntity, {
            id_usuario: usuariosHuertas.id_usuario?.id_usuario ?? existingEntity.id_usuario,
            id_huerta: usuariosHuertas.id_huerta?.id_huerta ?? existingEntity.id_huerta,
            fecha_vinculacion: usuariosHuertas.fecha_vinculacion ?? existingEntity.fecha_vinculacion
        });

        await this.usuariosHuertasRepository.save(existingEntity);
        return true;
    }

    async deleteUsuariosHuertas(id: number): Promise<boolean> {
        const result = await this.usuariosHuertasRepository.delete({ id_usuarios_huertas: id });
        return (result.affected ?? 0) > 0;
    }

    async getUsuariosHuertasById(id: number): Promise<UsuariosHuertasDomain | null> {
        const entity = await this.usuariosHuertasRepository.findOne({ 
            where: { id_usuarios_huertas: id },
            relations: ['usuario', 'huerta']
        });
        return entity ? this.toDomain(entity) : null;
    }

    async getAllUsuariosHuertas(): Promise<UsuariosHuertasDomain[]> {
        const entities = await this.usuariosHuertasRepository.find({
            relations: ['usuario', 'huerta']
        });
        return entities.map(entity => this.toDomain(entity));
    }

    async getUsuariosHuertasByUserId(userId: number): Promise<UsuariosHuertasDomain[]> {
        const entities = await this.usuariosHuertasRepository.find({
            where: { id_usuario: userId },
            relations: ['usuario', 'huerta']
        });
        return entities.map(entity => this.toDomain(entity));
    }

    async getUsuariosHuertasByHuertaId(huertaId: number): Promise<UsuariosHuertasDomain[]> {
        const entities = await this.usuariosHuertasRepository.find({
            where: { id_huerta: huertaId },
            relations: ['usuario', 'huerta']
        });
        return entities.map(entity => this.toDomain(entity));
    }
}
