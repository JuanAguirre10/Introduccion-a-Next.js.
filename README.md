# GLAB-S09 — Introducción a Next.js

Laboratorio N° 09 del curso **Desarrollo de Aplicaciones Web Avanzado** — TECSUP 2025-1.

## Descripción

Aplicación web construida con Next.js que demuestra las diferencias entre Client-Side Rendering (CSR) y Server-Side Rendering (SSR) a través de tres ejercicios prácticos.

## Ejercicios

### 1. PokeApp — CSR vs SSR
Dos páginas visualmente idénticas que consumen la [PokeAPI](https://pokeapi.co/) con estrategias de renderizado diferentes.

| Ruta | Estrategia |
|------|-----------|
| `/pokemon-csr` | Client-Side Rendering |
| `/pokemon-ssr` | Server-Side Rendering |

### 2. Dashboard del Clima
Dashboard híbrido que combina SSR y CSR en una misma página usando la [Open-Meteo API](https://open-meteo.com/).

- Lima, Perú → SSR (datos obtenidos en el servidor)
- Mundo → CSR (selector interactivo de ciudades)

| Ruta | Descripción |
|------|------------|
| `/weather` | Dashboard híbrido SSR + CSR |

### 3. Galería de Películas — Lumière Cinema
Aplicación integradora usando la [OMDb API](https://www.omdbapi.com/) con diseño tipo cine premium.

| Ruta | Descripción |
|------|------------|
| `/movies` | Galería completa SSR + CSR |

Funcionalidades:
- Lista de películas populares renderizada en el servidor (SSR)
- Buscador en tiempo real sin recargar la página (CSR)
- Modal con información completa de cada película/serie

## Tecnologías

- [Next.js](https://nextjs.org/) — Framework principal con App Router
- [TypeScript](https://www.typescriptlang.org/) — Tipado estático
- [Tailwind CSS](https://tailwindcss.com/) — Estilos
- [Axios](https://axios-http.com/) — Peticiones HTTP
- [OMDb API](https://www.omdbapi.com/) — Datos de películas y series
- [PokeAPI](https://pokeapi.co/) — Datos de Pokémon
- [Open-Meteo API](https://open-meteo.com/) — Datos del clima

## Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd my-first-project

# Instalar dependencias
npm install

# Iniciar en desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## Estructura del proyecto

```
app/
├── pokemon-csr/
│   └── page.tsx          # Pokémon con CSR
├── pokemon-ssr/
│   └── page.tsx          # Pokémon con SSR
├── weather/
│   ├── page.tsx          # Dashboard del clima (SSR + CSR)
│   └── ClientWeatherWidget.tsx
└── movies/
    ├── page.tsx          # Galería de películas (SSR + CSR)
    └── SearchClient.tsx
```

## Autor

Juan Aguirre — TECSUP 2025