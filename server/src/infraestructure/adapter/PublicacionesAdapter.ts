import { PublicacionesPort } from "../../domain/publicaciones_port";
import { Publicacion as PublicacionDomain } from "../../domain/publicaciones";
import { publicaciones as PublicacionEntity } from "../entities/publicaciones";
import { AppDataSource } from "../config/data-base";
import { Repository } from "typeorm";

export class PublicacionesAdapter implements PublicacionesPort {
    private publicacionesRepository: Repository<PublicacionEntity>;

    constructor() {
        this.publicacionesRepository = AppDataSource.getRepository(PublicacionEntity);
    }

    private async toDomain(publicacion: PublicacionEntity): Promise<PublicacionDomain> {
        const uh = publicacion.usuarios_huertas;
        if (!uh) {
            throw new Error('La publicación no tiene relación con usuarios_huertas');
        }
        
        const usuario = uh.usuario;
        const huerta = uh.huerta;
        const tipoUsuario = usuario?.tipo_usuario;
        
        if (!usuario || !huerta) {
            throw new Error('La relación usuarios_huertas no tiene usuario o huerta válidos');
        }
        
        return {
            id_publicacion: publicacion.id_publicacion,
            titulo_post: publicacion.titulo_post,
            contenido_post: publicacion.contenido_post,
            fecha_post: publicacion.fecha_post,
            id_usuarios_huertas: {
                id_usuarios_huertas: uh.id_usuarios_huertas,
                id_usuario: {
                    id_usuario: usuario.id_usuario,
                    nombre: usuario.nombre,
                    apellido: usuario.apellido,
                    correo: usuario.correo,
                    contrasena: usuario.contrasena,
                    id_tipo_usuario: {
                        id_tipo_usuario: tipoUsuario?.id_tipo_usuario || 0,
                        descripcion_tipo_usuario: tipoUsuario?.descripcion_tipo_usuario || 'Sin tipo'
                    },
                    fecha_creacion: usuario.fecha_creacion
                },
                id_huerta: {
                    id_huerta: huerta.id_huerta,
                    nombre_huerta: huerta.nombre_huerta,
                    direccion_huerta: huerta.direccion_huerta,
                    descripcion: huerta.descripcion,
                    fecha_creacion: huerta.fecha_creacion
                },
                fecha_vinculacion: uh.fecha_vinculacion
            }
        };
    }

    private toEntity(publicacion: Omit<PublicacionDomain, "id_publicacion">): PublicacionEntity {
        const entity = new PublicacionEntity();
        entity.titulo_post = publicacion.titulo_post;
        entity.contenido_post = publicacion.contenido_post;
        entity.fecha_post = publicacion.fecha_post;
        entity.id_usuarios_huertas = typeof publicacion.id_usuarios_huertas === 'number' 
            ? publicacion.id_usuarios_huertas 
            : publicacion.id_usuarios_huertas.id_usuarios_huertas;
        return entity;
    }

    async createPublicacion(publicacion: Omit<PublicacionDomain, 'id_publicacion'>): Promise<number> {
        try {
            console.log('PublicacionesAdapter - Datos recibidos:', publicacion);
            const newEntity = this.toEntity(publicacion);
            console.log('PublicacionesAdapter - Entidad creada:', newEntity);
            const savedEntity = await this.publicacionesRepository.save(newEntity);
            console.log('PublicacionesAdapter - Entidad guardada:', savedEntity);
            return savedEntity.id_publicacion;
        } catch (error) {
            console.error('PublicacionesAdapter - Error al crear publicación:', error);
            throw error;
        }
    }

    async updatePublicacion(id: number, publicacion: Partial<PublicacionDomain>): Promise<boolean> {
        try {
            console.log('PublicacionesAdapter - Actualizando publicación ID:', id);
            console.log('PublicacionesAdapter - Datos a actualizar:', publicacion);
            
            const existingEntity = await this.publicacionesRepository.findOne({ 
                where: { id_publicacion: id }, 
                relations: ["usuarios_huertas"] 
            });
            
            if (!existingEntity) {
                console.log('PublicacionesAdapter - Publicación no encontrada');
                return false;
            }

            // Actualizar solo los campos que se proporcionan
            if (publicacion.titulo_post !== undefined) {
                existingEntity.titulo_post = publicacion.titulo_post;
            }
            if (publicacion.contenido_post !== undefined) {
                existingEntity.contenido_post = publicacion.contenido_post;
            }
            if (publicacion.fecha_post !== undefined) {
                existingEntity.fecha_post = publicacion.fecha_post;
            }
            if (publicacion.id_usuarios_huertas !== undefined) {
                existingEntity.id_usuarios_huertas = typeof publicacion.id_usuarios_huertas === 'number' 
                    ? publicacion.id_usuarios_huertas 
                    : publicacion.id_usuarios_huertas?.id_usuarios_huertas ?? existingEntity.id_usuarios_huertas;
            }

            console.log('PublicacionesAdapter - Entidad actualizada:', existingEntity);
            await this.publicacionesRepository.save(existingEntity);
            console.log('PublicacionesAdapter - Publicación actualizada exitosamente');
            return true;
        } catch (error) {
            console.error('PublicacionesAdapter - Error al actualizar publicación:', error);
            throw error;
        }
    }

    async deletePublicacion(id: number): Promise<boolean> {
        const result = await this.publicacionesRepository.delete({ id_publicacion: id });
        return (result.affected ?? 0) > 0;
    }

    async getPublicacionById(id: number): Promise<PublicacionDomain | null> {
        const entity = await this.publicacionesRepository.findOne({ 
            where: { id_publicacion: id }, 
            relations: ["usuarios_huertas", "usuarios_huertas.usuario", "usuarios_huertas.huerta", "usuarios_huertas.usuario.tipo_usuario"] 
        });
        if (!entity) return null;
        return this.toDomain(entity);
    }

    async getAllPublicaciones(): Promise<PublicacionDomain[]> {
        const entities = await this.publicacionesRepository.find({ relations: ["usuarios_huertas", "usuarios_huertas.usuario", "usuarios_huertas.huerta", "usuarios_huertas.usuario.tipo_usuario"] });
        return await Promise.all(entities.map(entity => this.toDomain(entity)));
    }

    async getPublicacionesByUsuariosHuertasId(id_usuarios_huertas: number): Promise<PublicacionDomain[]> {
        const entities = await this.publicacionesRepository.find({ where: { id_usuarios_huertas }, relations: ["usuarios_huertas", "usuarios_huertas.usuario", "usuarios_huertas.huerta", "usuarios_huertas.usuario.tipo_usuario"] });
        return await Promise.all(entities.map(entity => this.toDomain(entity)));
    }

    async getPublicacionByTitle(title: string): Promise<PublicacionDomain | null> {
        const entity = await this.publicacionesRepository.findOne({ 
            where: { titulo_post: title }, 
            relations: ["usuarios_huertas", "usuarios_huertas.usuario", "usuarios_huertas.huerta", "usuarios_huertas.usuario.tipo_usuario"] 
        });
        if (!entity) return null;
        return this.toDomain(entity);
    }

    async getPublicacionesByHuertaId(id_huerta: number): Promise<PublicacionDomain[]> {
        try {
            // Usar query builder de forma más simple y directa
            const entities = await this.publicacionesRepository
                .createQueryBuilder('publicacion')
                .leftJoinAndSelect('publicacion.usuarios_huertas', 'uh')
                .leftJoinAndSelect('uh.usuario', 'usuario')
                .leftJoinAndSelect('uh.huerta', 'huerta')
                .leftJoinAndSelect('usuario.tipo_usuario', 'tipo')
                .where('uh.id_huerta = :id_huerta', { id_huerta })
                .getMany();
            
            return await Promise.all(entities.map(entity => this.toDomain(entity)));
        } catch (error) {
            console.error('Error en getPublicacionesByHuertaId:', error);
            return [];
        }
    }
} 