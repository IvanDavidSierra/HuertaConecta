import { User } from "./usuarios";
import { Huerta } from "./huertas";

export interface UsuariosHuertas{
    id_usuarios_huertas: number;
    id_usuario: User;
    id_huerta: Huerta;
    fecha_vinculacion: Date;
}