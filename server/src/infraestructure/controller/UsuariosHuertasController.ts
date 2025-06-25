import { UsuariosHuertasApplicationService } from "../../application/UsuariosHuertasApplicationService";
import { Request, Response } from "express";
import { UsuariosHuertas } from "../../domain/usuarios_huertas";

export class UsuariosHuertasController {
    private app: UsuariosHuertasApplicationService;

    constructor(app: UsuariosHuertasApplicationService) {
        this.app = app;
    }

    async createUsuariosHuertas(req: Request, res: Response) {
        try {
            const { id_usuario, id_huerta, fecha_vinculacion } = req.body;

            // Validaciones con expresiones regulares
            if (!this.validateId(id_usuario)) {
                return res.status(400).json({ error: "ID de usuario inválido" });
            }

            if (!this.validateId(id_huerta)) {
                return res.status(400).json({ error: "ID de huerta inválido" });
            }

            // Construir los objetos User y Huerta con solo los IDs
            const usuariosHuertas: Omit<UsuariosHuertas, "id_usuarios_huertas"> = {
                id_usuario: {
                    id_usuario: parseInt(id_usuario),
                    nombre: "",
                    apellido: "",
                    correo: "",
                    contrasena: "",
                    id_tipo_usuario: {
                        id_tipo_usuario: 0,
                        descripcion_tipo_usuario: ""
                    },
                    fecha_creacion: new Date()
                },
                id_huerta: {
                    id_huerta: parseInt(id_huerta),
                    nombre_huerta: "",
                    direccion_huerta: "",
                    descripcion: "",
                    fecha_creacion: new Date()
                },
                fecha_vinculacion: fecha_vinculacion ? new Date(fecha_vinculacion) : new Date(),
            };

            const id = await this.app.createUsuariosHuertas(usuariosHuertas);
            return res.status(201).json({ message: "Vinculación creada con éxito", id });
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: "Error interno del servidor", details: error.message });
            }
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    async updateUsuariosHuertas(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { id_usuario, id_huerta, fecha_vinculacion } = req.body;

            // Validar ID del parámetro
            if (!this.validateId(id)) {
                return res.status(400).json({ error: "ID de vinculación inválido" });
            }

            // Validaciones opcionales para los campos a actualizar
            const updateData: Partial<UsuariosHuertas> = {};

            if (id_usuario !== undefined) {
                if (!this.validateId(id_usuario)) {
                    return res.status(400).json({ error: "ID de usuario inválido" });
                }
                updateData.id_usuario = {
                    id_usuario: parseInt(id_usuario),
                    nombre: "",
                    apellido: "",
                    correo: "",
                    contrasena: "",
                    id_tipo_usuario: {
                        id_tipo_usuario: 0,
                        descripcion_tipo_usuario: ""
                    },
                    fecha_creacion: new Date()
                };
            }

            if (id_huerta !== undefined) {
                if (!this.validateId(id_huerta)) {
                    return res.status(400).json({ error: "ID de huerta inválido" });
                }
                updateData.id_huerta = {
                    id_huerta: parseInt(id_huerta),
                    nombre_huerta: "",
                    direccion_huerta: "",
                    descripcion: "",
                    fecha_creacion: new Date()
                };
            }

            if (fecha_vinculacion !== undefined) {
                if (!this.validateDate(fecha_vinculacion)) {
                    return res.status(400).json({ error: "Fecha de vinculación inválida" });
                }
                updateData.fecha_vinculacion = new Date(fecha_vinculacion);
            }

            const success = await this.app.updateUsuariosHuertas(parseInt(id), updateData);
            
            if (success) {
                return res.status(200).json({ message: "Vinculación actualizada con éxito" });
            } else {
                return res.status(404).json({ error: "Vinculación no encontrada" });
            }
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: "Error interno del servidor", details: error.message });
            }
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    async deleteUsuariosHuertas(req: Request, res: Response) {
        try {
            const { id } = req.params;

            // Validar ID del parámetro
            if (!this.validateId(id)) {
                return res.status(400).json({ error: "ID de vinculación inválido" });
            }

            const success = await this.app.deleteUsuariosHuertas(parseInt(id));
            
            if (success) {
                return res.status(200).json({ message: "Vinculación eliminada con éxito" });
            } else {
                return res.status(404).json({ error: "Vinculación no encontrada" });
            }
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: "Error interno del servidor", details: error.message });
            }
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    async getUsuariosHuertasById(req: Request, res: Response) {
        try {
            const { id } = req.params;

            // Validar ID del parámetro
            if (!this.validateId(id)) {
                return res.status(400).json({ error: "ID de vinculación inválido" });
            }

            const usuariosHuertas = await this.app.getUsuariosHuertasById(parseInt(id));
            
            if (usuariosHuertas) {
                return res.status(200).json(usuariosHuertas);
            } else {
                return res.status(404).json({ error: "Vinculación no encontrada" });
            }
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: "Error interno del servidor", details: error.message });
            }
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    async getAllUsuariosHuertas(_req: Request, res: Response) {
        try {
            const usuariosHuertas = await this.app.getAllUsuariosHuertas();
            return res.status(200).json(usuariosHuertas);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: "Error interno del servidor", details: error.message });
            }
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    async getUsuariosHuertasByUserId(req: Request, res: Response) {
        try {
            const { userId } = req.params;

            // Validar ID del usuario
            if (!this.validateId(userId)) {
                return res.status(400).json({ error: "ID de usuario inválido" });
            }

            const usuariosHuertas = await this.app.getUsuariosHuertasByUserId(parseInt(userId));
            return res.status(200).json(usuariosHuertas);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: "Error interno del servidor", details: error.message });
            }
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    async getUsuariosHuertasByHuertaId(req: Request, res: Response) {
        try {
            const { huertaId } = req.params;

            // Validar ID de la huerta
            if (!this.validateId(huertaId)) {
                return res.status(400).json({ error: "ID de huerta inválido" });
            }

            const usuariosHuertas = await this.app.getUsuariosHuertasByHuertaId(parseInt(huertaId));
            return res.status(200).json(usuariosHuertas);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: "Error interno del servidor", details: error.message });
            }
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    // Métodos de validación con expresiones regulares
    private validateId(id: any): boolean {
        // Valida que sea un número entero positivo
        const idRegex = /^[1-9]\d*$/;
        return typeof id === 'number' || (typeof id === 'string' && idRegex.test(id));
    }

    private validateDate(date: any): boolean {
        // Valida formato de fecha ISO o fecha válida
        const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/;
        const simpleDateRegex = /^\d{4}-\d{2}-\d{2}$/;
        
        if (typeof date === 'string') {
            return dateRegex.test(date) || simpleDateRegex.test(date);
        }
        
        if (date instanceof Date) {
            return !isNaN(date.getTime());
        }
        
        return false;
    }
}