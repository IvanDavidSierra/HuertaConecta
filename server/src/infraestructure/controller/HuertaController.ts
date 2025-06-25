import { HuertaApplicationService } from "../../application/HuertaApplicationService";
import { Huerta } from "src/domain/huertas";
import { Request, Response } from "express";

export class HuertaController{
    private app: HuertaApplicationService;

    constructor(app: HuertaApplicationService){
        this.app = app;
    }

    async createHuerta(req: Request, res: Response){
        try{
            const { nombre_huerta, descripcion, direccion_huerta, fecha_creacion } = req.body;
            if (!/^.{10,}$/.test(nombre_huerta.trim()))
            return res
                .status(400)
                .json({
                    error:
                    "El nombre debe tener al menos 10 caracteres",
                });

            if(!/^.{20,}$/.test(descripcion.trim()))
            return res
                .status(400)
                .json({ error: "La descripción debe tener al menos 20 caracteres" });

            //crear huerta
            const huerta: Omit<Huerta, "id_huerta"> = {
                nombre_huerta,
                descripcion,
                direccion_huerta,
                fecha_creacion
            };
            const huertaId = await this.app.createHuerta(huerta);
            return res
                .status(201)
                .json({ message: "Huerta creada con éxito", huertaId });
        }   catch (error) {
            if (error instanceof Error) {
                return res
                    .status(500)
                    .json({
                        error: "Error interno del servidor",
                        details: error.message,
                    });
            }
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    async getHuertaById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ error: "ID inválido" });
            }
            const huerta = await this.app.getHuertaById(id);
            if (!huerta) {
                return res.status(404).json({ error: "Huerta no encontrada" });
            }
            return res.status(200).json(huerta);
        } catch (error) {
            if (error instanceof Error) {
                return res
                    .status(500)
                    .json({
                        error: "Error interno del servidor",
                        details: error.message,
                    });
            }
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    async getAllHuertas(_req:Request,res: Response) {
        try {
            const huertas = await this.app.getAllHuertas();
            return res.status(200).json(huertas);
        } catch (error) {
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    async getHuertaByName(req: Request, res: Response) {
        try {
            const { nombre } = req.params;
            if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúÑñ]+)?$/.test(nombre.trim())) {
                return res.status(400).json({ error: "Nombre de huerta no válido" });
            }
            const huerta = await this.app.getHuertaByNombre(nombre);
            if (!huerta) {
                return res.status(404).json({ error: "Huerta no encontrada" });
            }
            return res.status(200).json(huerta);
        } catch (error) {
            if (error instanceof Error) {
                return res
                    .status(500)
                    .json({
                        error: "Error interno del servidor",
                        details: error.message,
                    });
            }
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    async deleteHuerta(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ error: "ID inválido" });
            }
            const deleted = await this.app.deleteHuerta(id);
            if (!deleted) {
                return res.status(404).json({ error: "Huerta no encontrada" });
            }
            return res.status(200).json({ message: "Huerta eliminada con éxito" });
        } catch (error) {
            if (error instanceof Error) {
                return res
                    .status(500)
                    .json({
                        error: "Error interno del servidor",
                        details: error.message,
                    });
            }
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

async updateHuerta(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        const {
            nombre_huerta,
            descripcion,
            direccion_huerta,
            fecha_creacion
        } = req.body;

        // Validaciones opcionales
        if (nombre_huerta !== undefined) {
            if (typeof nombre_huerta !== 'string' || !/^.{10,}$/.test(nombre_huerta.trim())) {
                return res.status(400).json({ error: "Nombre de huerta no válido" });
            }
        }

        if (descripcion !== undefined) {
            if (typeof descripcion !== 'string' || !/^.{20,}$/.test(descripcion.trim())) {
                return res.status(400).json({ error: "La descripción debe tener al menos 20 caracteres" });
            }
        }

        const huerta: Partial<Huerta> = {
            ...(nombre_huerta && { nombre_huerta }),
            ...(descripcion && { descripcion }),
            ...(direccion_huerta && { direccion_huerta }),
            ...(fecha_creacion && { fecha_creacion })
        };

        const updated = await this.app.updateHuerta(id, huerta);
        if (!updated) {
            return res.status(404).json({ error: "Huerta no encontrada" });
        }

        return res.status(200).json({ message: "Huerta actualizada con éxito" });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                error: "Error interno del servidor",
                details: error.message,
            });
        }
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}

}