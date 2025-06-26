import { Request, Response } from 'express';
import { EstadosTareasAdapter } from '../adapter/EstadosTareasAdapter';

const estadosTareasAdapter = new EstadosTareasAdapter();

export class EstadosTareasController {
  static async createEstadoTarea(req: Request, res: Response) {
    const estado = await estadosTareasAdapter.createEstadoTarea(req.body);
    res.json(estado);
  }

  static async getEstadoTareaById(req: Request, res: Response) {
    const estado = await estadosTareasAdapter.getEstadoTareaById(Number(req.params.id));
    res.json(estado);
  }

  static async getEstadoTareaByDescripcion(req: Request, res: Response) {
    const estado = await estadosTareasAdapter.getEstadoTareaByDescripcion(req.params.descripcion);
    res.json(estado);
  }

  static async getAllEstadosTareas(_req: Request, res: Response) {
    const estados = await estadosTareasAdapter.getAllEstadosTareas();
    res.json(estados);
  }

  static async updateEstadoTarea(req: Request, res: Response) {
    const estado = await estadosTareasAdapter.updateEstadoTarea(Number(req.params.id), req.body);
    res.json(estado);
  }

  static async deleteEstadoTarea(req: Request, res: Response) {
    const result = await estadosTareasAdapter.deleteEstadoTarea(Number(req.params.id));
    res.json({ success: result });
  }
} 