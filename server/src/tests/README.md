# Pruebas Unitarias - HuertaConecta

Este directorio contiene las pruebas unitarias del proyecto HuertaConecta, organizadas siguiendo la arquitectura hexagonal del proyecto.

## Estructura

```
tests/
├── domain/           # Pruebas del dominio (entidades, interfaces)
├── services/         # Pruebas de servicios de aplicación
├── validation/       # Pruebas de validaciones
└── README.md         # Este archivo
```

## Pruebas Implementadas

### 1. Domain Tests (`domain/User.test.ts`)
- **Propósito**: Probar la creación y validación de entidades del dominio
- **Casos de prueba**:
  - Creación de usuario válido con todas las propiedades
  - Validación de formato de email
  - Validación de nombres no vacíos

### 2. Service Tests (`services/UserApplicationService.test.ts`)
- **Propósito**: Probar la lógica de negocio en los servicios de aplicación
- **Casos de prueba**:
  - Creación exitosa de usuario cuando el email no existe
  - Error al crear usuario con email duplicado
  - Obtención de usuario por ID (existente y no existente)

### 3. Validation Tests (`validation/UserValidation.test.ts`)
- **Propósito**: Probar las funciones de validación de datos
- **Casos de prueba**:
  - Validación de emails (correctos e incorrectos)
  - Validación de contraseñas (longitud mínima)
  - Validación de nombres (formato y longitud)
  - Validación completa de usuario (válido e inválido)

## Comandos de Testing

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas en modo watch (desarrollo)
npm run test:watch

# Ejecutar pruebas con cobertura
npm run test:coverage
```

## Tecnologías Utilizadas

- **Jest**: Framework de testing
- **TypeScript**: Soporte para TypeScript
- **ts-jest**: Transformador de TypeScript para Jest

## Convenciones

- Los archivos de prueba terminan en `.test.ts`
- Se usa el patrón AAA (Arrange, Act, Assert)
- Los mocks se crean para simular dependencias externas
- Las pruebas están en español para mantener consistencia con el proyecto

## Cobertura

Las pruebas cubren:
- ✅ Entidades del dominio
- ✅ Servicios de aplicación
- ✅ Funciones de validación
- ✅ Casos de éxito y error
- ✅ Validación de reglas de negocio 