# TV Show Manager

Una aplicación web moderna para gestionar y hacer seguimiento de series de televisión, integrada con The Movie Database (TMDB) API.

## Sobre el Proyecto

Aplicación full-stack desarrollada con **React 18**, **TypeScript** y **Tailwind CSS** que permite a los usuarios buscar series, marcar episodios como vistos, gestionar favoritos y realizar seguimiento de su progreso de visualización. Diseñada con enfoque en **UX/UI**, **performance** y **código limpio**.

## Stack Tecnológico

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-4.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6.0-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

## Características Técnicas Destacadas

### Arquitectura y Diseño
- **Componentes modulares y reutilizables** con separación clara de responsabilidades
- **Custom Hooks** (`useSeries`) para lógica de negocio desacoplada de la UI
- **Context API** para gestión de estado global (autenticación)
- **TypeScript estricto** con interfaces bien definidas para tipado completo
- **Responsive Design** con breakpoints mobile-first (sm, md, lg)

### Gestión de Datos
- **Integración REST API** con TMDB para datos de series
- **Sistema de tracking de episodios** con arrays booleanos 2D
- **Optimización de rendimiento** con `Promise.all` para carga paralela de temporadas
- **Manejo de estados de carga** con spinners y skeletons

### UX/UI
- **Dark Mode** implementado con Tailwind CSS
- **Notificaciones toast** para feedback de acciones del usuario
- **Lazy loading** de imágenes para mejor performance
- **Estados visuales claros** (favoritos, vistos, progreso)
- **Validaciones de autenticación** con rutas protegidas

### Buenas Prácticas
- **ESLint** configurado con reglas de React y TypeScript
- **Manejo de errores** con try-catch y logging
- **Código limpio** con nombres descriptivos y comentarios donde es necesario
- **Git** para control de versiones

## Funcionalidades Principales

### Para Usuarios
- **Búsqueda de series** por nombre con resultados en tiempo real
- **Detalle completo** de series: sinopsis, temporadas, episodios, rating
- **Gestión de favoritos** con persistencia en base de datos
- **Seguimiento de episodios**: marcar individualmente o por temporada completa
- **Progreso de visualización** con porcentaje de series vistas
- **Perfil de usuario** con resumen de series favoritas y progreso

### Sistema de Autenticación
- Login/Registro de usuarios
- Rutas protegidas (Protected Routes)
- Rutas públicas para usuarios no autenticados
- Persistencia de sesión

## Instalación y Uso

### Prerrequisitos
- Node.js 16+
- pnpm o npm

### Pasos

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/tvshow-manager.git
cd tvshow-manager
```

2. **Instalar dependencias**
```bash
pnpm install
# o
npm install
```

3. **Configurar variables de entorno**
Crear archivo `.env` en la raíz:
```env
VITE_API_KEY=tu_api_key_de_tmdb
```

4. **Iniciar servidor de desarrollo**
```bash
pnpm dev
# o
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build para producción
```bash
pnpm build
# o
npm run build
```

## Scripts Disponibles

- `dev` - Inicia servidor de desarrollo con Vite
- `build` - Genera build optimizado para producción
- `preview` - Previsualiza build de producción localmente
- `lint` - Ejecuta ESLint para análisis estático de código
