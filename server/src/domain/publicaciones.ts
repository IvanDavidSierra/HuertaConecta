import { UsuariosHuertas } from "./usuarios_huertas";

export interface Publicacion {
    id_publicacion: number;
    titulo_post: string;
    contenido_post: string;
    fecha_post: Date;
    id_usuarios_huertas: UsuariosHuertas;
} 