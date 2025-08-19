# EmprenArtesanales

## Sistema de Gestión de Producción Artesanal

Un sistema integral de gestión de inventario y producción diseñado específicamente para productores artesanales de pequeña escala. Esta aplicación ayuda a gestionar materias primas, rastrear recetas, controlar lotes de producción y monitorear el inventario de productos terminados con características de nivel profesional y una interfaz de usuario intuitiva.

## 🎯 Características Principales

### Gestión de Inventario
- **Seguimiento de Materias Primas**: Monitorea cantidades de insumos con alertas automáticas de stock bajo
- **Control de Productos Terminados**: Rastrea niveles de inventario de productos completados
- **Actualizaciones de Stock en Tiempo Real**: Ajustes automáticos de inventario durante la producción
- **Historial de Transacciones de Stock**: Registro completo de auditoría de todos los movimientos de inventario

### Gestión de Recetas
- **Creación Detallada de Recetas**: Define ingredientes, cantidades e instrucciones de producción
- **Biblioteca de Recetas**: Organiza y gestiona todas tus fórmulas de producción
- **Cálculo de Costos de Ingredientes**: Rastrea costos de materiales por receta
- **Seguimiento de Rendimiento de Producción**: Monitorea producción esperada vs real

### Producción por Lotes
- **Planificación de Producción**: Programa y organiza corridas de producción
- **Seguimiento de Lotes**: Monitorea el estado de producción desde el inicio hasta la finalización
- **Control de Calidad**: Registra notas de lotes y observaciones de producción
- **Actualizaciones Automáticas de Inventario**: Ajustes de stock en tiempo real durante la producción

### Análisis e Informes
- **Panel de Producción**: Vista visual de métricas clave y actividad reciente
- **Informes de Lotes**: Historial detallado de producción con filtrado por fechas
- **Análisis de Consumo de Insumos**: Rastrea patrones de uso de materiales
- **Monitoreo de Niveles de Stock**: Gráficos visuales de tendencias de inventario
- **Análisis de Costos**: Seguimiento de costos de producción y análisis de rentabilidad

## 🛠 Stack Tecnológico

- **Frontend**: React 18 con TypeScript
- **Estilos**: Tailwind CSS con sistema de diseño personalizado
- **Base de Datos**: Supabase (PostgreSQL) con Seguridad a Nivel de Fila
- **Autenticación**: Supabase Auth con email/contraseña
- **Gráficos**: Recharts para visualización de datos
- **Iconos**: Lucide React para iconografía consistente
- **Herramienta de Construcción**: Vite para desarrollo rápido y construcciones optimizadas

## 🏗 Arquitectura de Base de Datos

El sistema utiliza una base de datos relacional con las siguientes tablas principales:

- **Products**: Catálogo de productos terminados
- **Inputs**: Inventario de materias primas e ingredientes
- **Recipes**: Fórmulas de producción con listas de ingredientes
- **Recipe Ingredients**: Tabla de unión que vincula recetas con insumos
- **Batches**: Registros de corridas de producción
- **Batch Transactions**: Seguimiento detallado de producción
- **Stock Transactions**: Historial completo de movimientos de inventario

## 🚀 Comenzando

1. **Clonar e Instalar**
   ```bash
   npm install
   ```

2. **Configuración de Base de Datos**
   - Haz clic en "Conectar a Supabase" en la aplicación
   - Configura tu proyecto de Supabase
   - El esquema de base de datos se creará automáticamente

3. **Configuración de Entorno**
   - Copia `.env.example` a `.env`
   - Agrega tus credenciales de Supabase

4. **Iniciar Desarrollo**
   ```bash
   npm run dev
   ```

## 📱 Interfaz de Usuario

La aplicación presenta un diseño limpio y profesional con:
- **Iconos Visuales Grandes**: Navegación fácil con señales visuales claras
- **Diseño Responsivo**: Funciona perfectamente en escritorio, tablet y móvil
- **Flujo de Trabajo Intuitivo**: Progresión lógica desde insumos → recetas → producción → informes
- **Actualizaciones en Tiempo Real**: Estado de inventario y producción en vivo
- **Estética Profesional**: Interfaz limpia y moderna adecuada para uso empresarial

## 🎯 Usuarios Objetivo

Perfecto para productores artesanales de pequeña escala incluyendo:
- Productores de alimentos artesanales
- Fabricantes de bebidas artesanales
- Creadores de cosméticos hechos a mano
- Manufactureros de lotes pequeños
- Fabricantes de productos especializados

## 📊 Beneficios Empresariales

- **Control de Inventario**: Nunca te quedes sin materiales ni tengas exceso de stock
- **Gestión de Costos**: Rastrea costos de producción y rentabilidad
- **Consistencia de Calidad**: Recetas estandarizadas aseguran producción consistente
- **Planificación de Producción**: Optimiza tamaños de lotes y programación
- **Listo para Cumplimiento**: Registro completo de auditoría para requisitos regulatorios

## 🔒 Características de Seguridad

- **Autenticación de Usuario**: Sistema de inicio de sesión seguro
- **Seguridad a Nivel de Fila**: Aislamiento de datos entre usuarios
- **Registro de Auditoría**: Historial completo de transacciones
- **Respaldo de Datos**: Respaldos automáticos de Supabase

---

## 👨‍💼 Información del Desarrollador

**Profesional**: César Eduardo González  
**Email**: gonzalezeduardo_31@hotmail.com  
**Celular**: +54 93884 858-907

---

*Construido con tecnologías web modernas para una gestión confiable y escalable de producción artesanal.*