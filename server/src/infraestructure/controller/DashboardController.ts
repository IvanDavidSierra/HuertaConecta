import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-base';
import { usuarios } from '../entities/usuarios';
import { tipos_usuarios } from '../entities/tipos_usuario';
import { huertas } from '../entities/huertas';
import { publicaciones } from '../entities/publicaciones';
import { CultivosEntity } from '../entities/cultivos';

export class DashboardController {
  static async getCounts(_req: Request, res: Response) {
    try {
      const userRepo = AppDataSource.getRepository(usuarios);
      const tipoUserRepo = AppDataSource.getRepository(tipos_usuarios);
      const huertaRepo = AppDataSource.getRepository(huertas);
      const pubRepo = AppDataSource.getRepository(publicaciones);
      const cultRepo = AppDataSource.getRepository(CultivosEntity);

      const [usuariosCount, tiposUsuarioCount, huertasCount, publicacionesCount, cultivosCount] = await Promise.all([
        userRepo.count(),
        tipoUserRepo.count(),
        huertaRepo.count(),
        pubRepo.count(),
        cultRepo.count()
      ]);

      return res.json({
        usuarios: usuariosCount,
        tiposUsuario: tiposUsuarioCount,
        huertas: huertasCount,
        publicaciones: publicacionesCount,
        cultivos: cultivosCount
      });
    } catch (error) {
      return res.status(500).json({ error: 'Error al obtener los conteos', details: error instanceof Error ? error.message : error });
    }
  }
} 