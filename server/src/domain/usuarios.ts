import { TipoUser } from "./tipos_usuarios";

export interface User{
    id_usuario:number;
    nombre:string;
    apellido:string;
    correo:string;
    contrasena:string;
    id_tipo_usuario: TipoUser;
    fecha_creacion:Date;
}