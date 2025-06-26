import { Request, Response } from 'express';
import { CultivosAdapter } from '../adapter/CultivosAdapter';

const cultivosAdapter = new CultivosAdapter();

export class CultivosController {
  static async createCultivo(req: Request, res: Response) {
    const cultivo = await cultivosAdapter.createCultivo(req.body);
    res.json(cultivo);
  }

  static async getCultivoById(req: Request, res: Response) {
    const cultivo = await cultivosAdapter.getCultivoById(Number(req.params.id));
    res.json(cultivo);
  }

  static async getCultivoByTitle(req: Request, res: Response) {
    const cultivo = await cultivosAdapter.getCultivoByTitle(req.params.titulo);
    res.json(cultivo);
  }

  static async getAllCultivos(req: Request, res: Response) {
    const cultivos = await cultivosAdapter.getAllCultivos();
    res.json(cultivos);
  }

  static async updateEstadoTarea(req: Request, res: Response) {
    const cultivo = await cultivosAdapter.updateCultivo(Number(req.params.id), req.body);
    res.json(cultivo);
  }

  static async deleteEstadoTarea(req: Request, res: Response) {
    const result = await cultivosAdapter.deleteCultivo(Number(req.params.id));
    res.json({ success: result });
  }
} 