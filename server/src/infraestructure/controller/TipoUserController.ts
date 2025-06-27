import { TipoUserApplicationService } from "../../application/TipoUserApplicationService";
import { TipoUser } from "../../domain/tipos_usuarios";
import { Request, Response } from "express";

export class TipoUserController {
    private tipoUserService: TipoUserApplicationService;

    constructor(tipoUserService: TipoUserApplicationService) {
        this.tipoUserService = tipoUserService;
    }

    async createTipoUser(req: Request, res: Response): Promise<void> {
        try {
            const tipoUser: Omit<TipoUser, 'id'> = req.body;
            const id = await this.tipoUserService.createTipoUser(tipoUser);
            res.status(201).json({ id, message: 'Tipo de usuario creado exitosamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al crear tipo de usuario', error: error.message });
        }
    }

    async updateTipoUser(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const tipoUser: Partial<TipoUser> = req.body;
            const success = await this.tipoUserService.updateTipoUser(id, tipoUser);
            if (success) {
                res.status(200).json({ message: 'Tipo de usuario actualizado exitosamente' });
            } else {
                res.status(404).json({ message: 'Tipo de usuario no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar tipo de usuario', error: error.message });
        }
    }

    async deleteTipoUser(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const success = await this.tipoUserService.deleteTipoUser(id);
            if (success) {
                res.status(200).json({ message: 'Tipo de usuario eliminado exitosamente' });
            } else {
                res.status(404).json({ message: 'Tipo de usuario no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar tipo de usuario', error: error.message });
        }
    }

    async getTipoUserById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const tipoUser = await this.tipoUserService.getTipoUserById(id);
            if (tipoUser) {
                res.json(tipoUser);
            } else {
                res.status(404).json({ message: 'Tipo de usuario no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener tipo de usuario', error: error.message });
        }
    }

    async getAllTipoUsers(res: Response){
        try {
            const tipoUsers = await this.tipoUserService.getAllTipoUsers();
            return res.status(200).json(tipoUsers);
        } catch (error) {
            return res.status(500).json({
                error: "Error interno del servidor",
                details: error.message
            });
        }
    }
}