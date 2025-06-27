import { PublicacionesApplicationService } from "../../application/PublicacionesApplicationService";
import { Request, Response } from "express";

export class PublicacionesController {
    private app: PublicacionesApplicationService;

    constructor(app: PublicacionesApplicationService) {
        this.app = app;
    }

    async createPublicacion(req: Request, res: Response) {
        try {
            const { titulo_post, contenido_post, fecha_post, id_usuarios_huertas } = req.body;
            console.log('PublicacionesController - Datos recibidos:', req.body);
            console.log('PublicacionesController - id_usuarios_huertas:', id_usuarios_huertas, typeof id_usuarios_huertas);
            
            if (!titulo_post || !contenido_post || !id_usuarios_huertas) {
                console.log('PublicacionesController - Faltan campos obligatorios');
                return res.status(400).json({ error: "Faltan campos obligatorios" });
            }
            const publicacion = {
                titulo_post,
                contenido_post,
                fecha_post: fecha_post ? new Date(fecha_post) : new Date(),
                id_usuarios_huertas: parseInt(id_usuarios_huertas)
            };
            console.log('PublicacionesController - Publicación a crear:', publicacion);
            const id = await this.app.createPublicacion(publicacion);
            console.log('PublicacionesController - Publicación creada con ID:', id);
            return res.status(201).json({ message: "Publicación creada con éxito", id });
        } catch (error) {
            console.error('PublicacionesController - Error:', error);
            if (error instanceof Error) {
                return res.status(500).json({ error: "Error interno del servidor", details: error.message });
            }
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    async updatePublicacion(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { titulo_post, contenido_post, fecha_post, id_usuarios_huertas } = req.body;
            
            console.log('PublicacionesController - Actualizando publicación ID:', id);
            console.log('PublicacionesController - Datos recibidos:', req.body);
            
            const updateData: any = {};
            if (titulo_post !== undefined) updateData.titulo_post = titulo_post;
            if (contenido_post !== undefined) updateData.contenido_post = contenido_post;
            if (fecha_post !== undefined) updateData.fecha_post = new Date(fecha_post);
            if (id_usuarios_huertas !== undefined) updateData.id_usuarios_huertas = parseInt(id_usuarios_huertas);
            
            console.log('PublicacionesController - Datos a actualizar:', updateData);
            
            const success = await this.app.updatePublicacion(parseInt(id), updateData);
            if (success) {
                return res.status(200).json({ message: "Publicación actualizada con éxito" });
            } else {
                return res.status(404).json({ error: "Publicación no encontrada" });
            }
        } catch (error) {
            console.error('PublicacionesController - Error al actualizar:', error);
            if (error instanceof Error) {
                return res.status(500).json({ error: "Error interno del servidor", details: error.message });
            }
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    async deletePublicacion(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const success = await this.app.deletePublicacion(parseInt(id));
            if (success) {
                return res.status(200).json({ message: "Publicación eliminada con éxito" });
            } else {
                return res.status(404).json({ error: "Publicación no encontrada" });
            }
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: "Error interno del servidor", details: error.message });
            }
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    async getPublicacionById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const publicacion = await this.app.getPublicacionById(parseInt(id));
            if (publicacion) {
                return res.status(200).json(publicacion);
            } else {
                return res.status(404).json({ error: "Publicación no encontrada" });
            }
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: "Error interno del servidor", details: error.message });
            }
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    async getAllPublicaciones(_req: Request, res: Response) {
        try {
            const publicaciones = await this.app.getAllPublicaciones();
            return res.status(200).json(publicaciones);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: "Error interno del servidor", details: error.message });
            }
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    async getPublicacionByTitle(req: Request, res: Response) {
        try {
            const { title } = req.params;
            const publicacion = await this.app.getPublicacionByTitle(title);
            return res.status(200).json(publicacion);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: "Error interno del servidor", details: error.message });
            }
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    async getPublicacionesByHuertaId(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const publicaciones = await this.app.getPublicacionesByHuertaId(Number(id));
            return res.status(200).json(publicaciones);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: "Error interno del servidor", details: error.message });
            }
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }
} 