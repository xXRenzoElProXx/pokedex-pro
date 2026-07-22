# Pokédex Pro

Pokédex moderna construida con React 19 y TypeScript, con búsqueda, filtros por tipo, favoritos persistentes y modo oscuro/claro.

## Stack

- **React 19** + **TypeScript**
- **Vite** — bundler y servidor de desarrollo
- **Tailwind CSS v4** — estilos utilitarios
- **React Router DOM** — enrutamiento
- **TanStack Query** — fetching y caché de datos de la PokéAPI
- **Axios** — cliente HTTP
- **Zustand** — estado global (favoritos, tema)
- **Framer Motion** — animaciones
- **Lucide React** — iconografía
- **ESLint** + **Prettier** — calidad y formato de código

## Características

- Listado de Pokémon con tarjetas responsive
- Búsqueda por nombre y filtro por tipo
- Paginación / scroll infinito
- Página de detalle con estadísticas, habilidades y cadena evolutiva
- Favoritos persistidos en `localStorage`
- Modo oscuro / claro
- Skeletons de carga y página 404
- Diseño responsive (móvil, tablet, escritorio)

## Ejecutar el proyecto

Requiere **Node.js 20+**.

```bash
npm install
npm run dev
```

Abrir [http://localhost:5173](http://localhost:5173).

Copia `.env.example` a `.env` si necesitas cambiar la URL base de la API (por defecto usa la PokéAPI pública).

## Otros comandos

| Comando                | Descripción                                                   |
| ---------------------- | ------------------------------------------------------------- |
| `npm run build`        | Compila TypeScript y genera el build de producción en `dist/` |
| `npm run preview`      | Sirve localmente el build de producción                       |
| `npm run lint`         | Corre ESLint sobre todo el proyecto                           |
| `npm run format`       | Formatea el código con Prettier                               |
| `npm run format:check` | Verifica el formato sin modificar archivos                    |

## Estructura del proyecto

```
src/
├── api/            # Cliente Axios y endpoints de la PokéAPI
├── assets/         # Imágenes, fuentes locales y estáticos
├── components/
│   ├── common/     # Componentes compartidos (layout, navegación, estados vacíos)
│   ├── pokemon/    # Componentes específicos de dominio (tarjeta, stats, tipos)
│   └── ui/         # Primitivas de interfaz reutilizables (botón, input, skeleton)
├── hooks/          # Hooks personalizados (useDebounce, useFavorites, etc.)
├── layouts/        # Layouts de página (shell principal, con header/footer)
├── pages/          # Vistas de rutas (Home, Detalle, 404)
├── routes/         # Definición del router
├── services/       # Lógica de negocio sobre los datos de la API
├── store/          # Stores de Zustand (favoritos, tema)
├── types/          # Tipos e interfaces de TypeScript
├── utils/          # Utilidades puras (formateo, colores por tipo, etc.)
├── App.tsx
└── main.tsx
```

## Despliegue en Vercel

1. Sube el proyecto a un repositorio de GitHub.
2. Importa el repositorio en [Vercel](https://vercel.com/new).
3. Vercel detecta automáticamente el framework (Vite). Confirma:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Despliega. Cada push a la rama principal genera un nuevo despliegue automáticamente.

## Autor

Este proyecto se construye de forma incremental como ejercicio de desarrollo frontend.
