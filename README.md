# HuertaConecta

HuertaConecta es una aplicación móvil que busca conectar las huertas urbanas de Bogotá, creando una red de comunidades colaborativas donde los usuarios pueden:

- Crear y gestionar huertas urbanas
- Unirse a huertas existentes
- Crear y asignar tareas
- Compartir publicaciones y actualizaciones
- Colaborar con otros miembros de la comunidad

## Estructura del Proyecto

El proyecto está dividido en dos partes principales:

- `/server`: Backend desarrollado con Express.js y PostgreSQL
- `/mobile`: Aplicación móvil desarrollada con React Native

## Requisitos del Sistema

### Backend
- Node.js v18 o superior
- PostgreSQL 14 o superior
- TypeScript
- Express.js

### Mobile
- React Native
- Node.js v18 o superior
- Android Studio / Xcode

## Instalación y Configuración

### Backend

1. Navega al directorio del servidor:
```bash
cd server
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env` basado en `.env.example`:
```bash
cp .env.example .env
```

4. Configura las variables de entorno en el archivo `.env`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=huertaconecta
DB_SCHEMA=huertaconecta
NODE_ENV=development
```

5. Inicia el servidor en modo desarrollo:
```bash
npm run dev
```

### Base de Datos

1. Asegúrate de tener PostgreSQL instalado y corriendo
2. Crea la base de datos y el schema:
```sql
CREATE DATABASE huertaconecta;
\c huertaconecta
CREATE SCHEMA huertaconecta;
```

## Scripts Disponibles

### Backend
- `npm run dev`: Inicia el servidor en modo desarrollo
- `npm run build`: Compila el proyecto TypeScript
- `npm start`: Inicia el servidor en modo producción

## Contribución

1. Haz un Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Convenciones de Código

- Usar TypeScript para todo el código
- Seguir el estilo de código establecido
- Documentar las funciones y componentes principales
- Escribir mensajes de commit descriptivos

## Licencia

Este proyecto está bajo la Licencia MIT. 