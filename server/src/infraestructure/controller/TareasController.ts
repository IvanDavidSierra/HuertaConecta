import { Request, Response } from 'express';
import { TareasAdapter } from '../adapter/TareasAdapter';

const tareasAdapter = new TareasAdapter();

export class TareasController {
  static async createTarea(req: Request, res: Response) {
    const tarea = await tareasAdapter.createTarea(req.body);
    res.json(tarea);
  }

  static async getTareaById(req: Request, res: Response) {
    const tarea = await tareasAdapter.getTareaById(Number(req.params.id));
    res.json(tarea);
  }

  static async getTareaByTitulo(req: Request, res: Response) {
    const tarea = await tareasAdapter.getTareaByTitulo(req.params.titulo);
    res.json(tarea);
  }

  static async getTareasByUsuarioHuertaId(req: Request, res: Response) {
    const tareas = await tareasAdapter.getTareasByUsuarioHuertaId(Number(req.params.id_usuarios_huertas));
    res.json(tareas);
  }

  static async getAllTareas(_req: Request, res: Response) {
    const tareas = await tareasAdapter.getAllTareas();
    res.json(tareas);
  }

  static async updateTarea(req: Request, res: Response) {
    const tarea = await tareasAdapter.updateTarea(Number(req.params.id), req.body);
    res.json(tarea);
  }

  static async deleteTarea(req: Request, res: Response) {
    const result = await tareasAdapter.deleteTarea(Number(req.params.id));
    res.json({ success: result });
  }
} 