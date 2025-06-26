import { Request, Response } from 'express';
import { CultivosAdapter } from '../adapter/CultivosAdapter';

const cultivosAdapter = new CultivosAdapter();

export class CultivosController {
  static async create(req: Request, res: Response) {
    const cultivo = await cultivosAdapter.createCultivo(req.body);
    res.json(cultivo);
  }

  static async getById(req: Request, res: Response) {
    const cultivo = await cultivosAdapter.getCultivoById(Number(req.params.id));
    res.json(cultivo);
  }

  static async getByTitle(req: Request, res: Response) {
    const cultivo = await cultivosAdapter.getCultivoByTitle(req.params.titulo);
    res.json(cultivo);
  }

  static async getAll(req: Request, res: Response) {
    const cultivos = await cultivosAdapter.getAllCultivos();
    res.json(cultivos);
  }

  static async update(req: Request, res: Response) {
    const cultivo = await cultivosAdapter.updateCultivo(Number(req.params.id), req.body);
    res.json(cultivo);
  }

  static async delete(req: Request, res: Response) {
    const result = await cultivosAdapter.deleteCultivo(Number(req.params.id));
    res.json({ success: result });
  }
} 