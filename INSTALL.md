# Guía de Instalación - HuertaConecta

Esta guía te ayudará a configurar el proyecto HuertaConecta en tu entorno local.

## Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- Node.js (v18 o superior)
- PostgreSQL (v14 o superior)
- npm o yarn
- Git

## Pasos de Instalación

### 1. Clonar el Repositorio

```bash
git clone [URL_DEL_REPOSITORIO]
cd huertaconecta
```

### 2. Configurar la Base de Datos

1. Inicia PostgreSQL en tu sistema
2. Accede a PostgreSQL y ejecuta:

```sql
CREATE DATABASE huertaconecta;
\c huertaconecta
CREATE SCHEMA huertaconecta;
```

3. Ejecuta el script de creación de tablas

### 4. Configurar el Backend

1. Navega al directorio del servidor:
```bash
cd server
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env` en la carpeta `server` con el siguiente contenido:
Para este paso, pueden revisar el archivo .env.example


4. Inicia el servidor: npm run dev


### 5. Verificar la Instalación

1. El servidor debería estar corriendo en `http://localhost:4000`

## Solución de Problemas Comunes

### Error de Conexión a la Base de Datos

Si ves errores de conexión a la base de datos:
1. Verifica que PostgreSQL esté corriendo
2. Confirma que las credenciales en `.env` sean correctas
3. Asegúrate de que la base de datos y el schema existan

### Error de Dependencias

Si hay errores al instalar dependencias:
1. Elimina la carpeta `node_modules`
2. Elimina el archivo `package-lock.json`
3. Ejecuta `npm install` nuevamente

## Notas Adicionales

- No compartas tu archivo `.env` con nadie
- Mantén PostgreSQL actualizado
- Para desarrollo, usa `npm run dev`
- Para producción, usa `npm run build` seguido de `npm start`

## Soporte

Si encuentras algún problema durante la instalación, por favor:
1. Revisa esta guía de instalación
2. Verifica los prerrequisitos
3. Revisa la sección de problemas comunes
4. Crea un issue en el repositorio si el problema persiste 