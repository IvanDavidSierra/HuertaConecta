import { TipoUserApplicationService } from "../../application/TipoUserApplicationService";
import { TipoUser } from "../../domain/tipos_usuarios";
import { Request, Response } from "express";

export class TipoUserController {
    private tipoUserService: TipoUserApplicationService;

    constructor(tipoUserService: TipoUserApplicationService) {
        this.tipoUserService = tipoUserService;
    }

    async createTipoUser(req: Request, res: Response): Promise<void> {
        const tipoUser: Omit<TipoUser, 'id'> = req.body;
        const id = await this.tipoUserService.createTipoUser(tipoUser);
        res.status(201).json({ id });
    }

    async updateTipoUser(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id);
        const tipoUser: Partial<TipoUser> = req.body;
        const success = await this.tipoUserService.updateTipoUser(id, tipoUser);
        if (success) {
            res.status(204).send();
        } else {
            res.status(404).send();
        }
    }

    async deleteTipoUser(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id);
        const success = await this.tipoUserService.deleteTipoUser(id);
        if (success) {
            res.status(204).send();
        } else {
            res.status(404).send();
        }
    }

    async getTipoUserById(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id);
        const tipoUser = await this.tipoUserService.getTipoUserById(id);
        if (tipoUser) {
            res.json(tipoUser);
        } else {
            res.status(404).send();
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