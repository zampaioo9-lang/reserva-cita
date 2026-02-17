# Documentación - ReservaCita

## Índice

- [Descripción General](#descripción-general)
- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Personalización](#personalización)
- [Desarrollo](#desarrollo)

## Descripción General

**ReservaCita** es una aplicación web desarrollada con Next.js 15 para gestión de citas y reservas. Actualmente implementa una página de presentación profesional con diseño personalizado.

### Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Next.js | 15.x | Framework React con SSR |
| React | 19.x | Biblioteca UI |
| TypeScript | 5.x | Tipado estático |
| Tailwind CSS | 4.x | Estilos utilitarios |
| Turbopack | - | Compilador de desarrollo |

## Instalación

### Requisitos Previos
- Node.js 18.17 o superior
- npm 9.x o superior

### Pasos de Instalación

1. Navegar a la carpeta del proyecto:
```bash
cd reserva-cita
```

2. Instalar dependencias (ya instaladas):
```bash
npm install
```

3. Iniciar servidor de desarrollo:
```bash
npm run dev
```

4. Abrir en navegador:
```
http://localhost:3000
```

## Estructura del Proyecto

```
reserva-cita/
│
├── app/                      # Carpeta principal de la aplicación (App Router)
│   ├── page.tsx             # Página principal (/)
│   ├── layout.tsx           # Layout raíz con metadata
│   ├── globals.css          # Estilos globales + Tailwind
│   └── favicon.ico          # Icono del sitio
│
├── public/                   # Archivos estáticos públicos
│   └── profile.jpg          # Foto de perfil
│
├── docs/                     # Documentación del proyecto
│   ├── README.md            # Este archivo
│   └── CHANGELOG.md         # Historial de cambios
│
├── node_modules/            # Dependencias (no versionar)
│
├── package.json             # Configuración del proyecto
├── tsconfig.json            # Configuración TypeScript
├── tailwind.config.ts       # Configuración Tailwind CSS
├── next.config.ts           # Configuración Next.js
└── .eslintrc.json          # Configuración ESLint
```

## Personalización

### Cambiar Foto de Perfil

**Ubicación**: `public/profile.jpg`

**Pasos**:
1. Preparar imagen (recomendado: 800x800px mínimo)
2. Formato: JPG, PNG, o WebP
3. Reemplazar archivo en `public/profile.jpg`
4. La optimización es automática

### Modificar Información Personal

**Archivo**: `app/page.tsx`

**Nombre** (línea 33):
```tsx
<h1 className="text-5xl md:text-7xl font-bold text-black mb-4 tracking-tight">
  Cesar Ayala  {/* ← Cambiar aquí */}
</h1>
```

**Cita/Frase** (línea 36):
```tsx
<p className="text-2xl md:text-3xl text-black/90 font-light italic leading-relaxed">
  "Nadie cura a nadie, pero nadie se cura solo"  {/* ← Cambiar aquí */}
</p>
```

### Cambiar Colores

**Color de Fondo** (línea 6):
```tsx
<div className="... bg-[#E8B923] ...">  {/* ← Código hexadecimal */}
```

**Colores de Ondas Decorativas** (líneas 10-21):
```tsx
<path fill="#D4A520" fillOpacity="0.3" ... />  {/* ← Primera onda */}
<path fill="#B8941F" fillOpacity="0.3" ... />  {/* ← Segunda onda */}
```

### Ajustar Tamaños

**Foto de perfil** (línea 26):
```tsx
<div className="... w-64 h-64 md:w-96 md:h-96 ...">  {/* ← Tamaños móvil/desktop */}
```

**Título** (línea 33):
```tsx
<h1 className="text-5xl md:text-7xl ...">  {/* ← Tamaños responsive */}
```

## Desarrollo

### Comandos Principales

```bash
# Desarrollo con hot-reload
npm run dev

# Compilar para producción
npm run build

# Ejecutar versión de producción
npm start

# Verificar código (linting)
npm run lint

# Verificar tipos TypeScript
npx tsc --noEmit
```

### Servidor de Desarrollo

- **URL local**: http://localhost:3000
- **Hot Module Replacement**: Activado
- **Turbopack**: Activado (compilación rápida)

### Variables de Entorno

Crear archivo `.env.local` en la raíz para variables de entorno:

```env
# Ejemplo
NEXT_PUBLIC_API_URL=https://api.ejemplo.com
DATABASE_URL=postgresql://...
```

## Arquitectura del Diseño

### Layout Responsive

**Móvil** (< 768px):
- Layout vertical (columna)
- Foto arriba, texto abajo
- Padding reducido
- Tamaños de texto menores

**Desktop** (≥ 768px):
- Layout horizontal (fila)
- Foto izquierda, texto derecha
- Mayor espaciado
- Tamaños de texto aumentados

### Optimizaciones

**Imágenes**:
- Componente `next/image` con optimización automática
- Lazy loading (excepto `priority` en hero)
- Formatos modernos (WebP) generados automáticamente

**Estilos**:
- Tailwind CSS con purga de CSS no usado
- SVG inline para decoraciones
- Clases utilitarias (menos CSS customizado)

**Performance**:
- Server Components por defecto
- Turbopack en desarrollo
- Route optimization en producción

## Solución de Problemas

### La imagen no se muestra

**Solución**: Verificar que:
- El archivo existe en `public/profile.jpg`
- El nombre coincide exactamente (case-sensitive)
- El servidor se reinició después de agregar la imagen

### Errores de compilación TypeScript

**Solución**:
```bash
# Limpiar caché de Next.js
rm -rf .next

# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### El servidor no inicia

**Solución**:
- Verificar que el puerto 3000 no esté en uso
- Usar puerto alternativo: `npm run dev -- -p 3001`

## Recursos Adicionales

- [Documentación de Next.js](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev)

## Soporte

Para reportar problemas o solicitar funcionalidades, crear un issue o contactar al equipo de desarrollo.

---

**Última actualización**: 03 de febrero de 2026
