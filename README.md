# 🎓 UniFlow - Dashboard Académico Inteligente

> **Proyecto Programado Fase I - Diseño de Software**  
> Tecnológico de Costa Rica - IC-6821  
> Profesor: Marcos Rodríguez  
> Entrega: 26 Septiembre 2025

UniFlow es una aplicación web diseñada para centralizar y optimizar la gestión académica (Tareas Sencillas) de estudiantes universitarios. La plataforma unifica tareas en forma de lista, tabla y kanban board, además de recursos como links a servicios institucionales, todo en un dashboard simple, moderno y accesible.

Características Principales

## ✨ Interfaz de usuario moderna y responsiva
🔐 Authenticación con Google
📱 Compatibilidad con dispositivos móviles
🎨 Diseño intuitivo y accesible

## Tecnologías Utilizadas
Frontend: React 19+
Styling: Tailwind CSS
Estado: Zustand
Routing: Tanstack Router
Build Tool: Vite
Package Manager: pnpm
Componentes UI/Design System: ShadCN
Iconos: Lucide Icons
API Calls: Axios + Tanstack Query

## 📸 Capturas de Pantalla

## 🛠️ Instalación y Setup Local

### Prerrequisitos

Node.js v18 o superior
pnpm v10 o superior
git

```bash
# Instalar pnpm globalmente si no lo tienes
npm install -g pnpm
```

1. Clonar el repositorio

```bash
git clone https://github.com/FabiSax12/UniFlow-Frontend
cd UniFlow-Frontend
```

2. Instalar dependencias
```bash
pnpm install
```

3. Configurar variables de entorno
```bash
cp .env.example .env
```

Editar `.env` con tus configuraciones:

4. Ejecutar en modo desarrollo
```bash
pnpm run dev
```

5. Acceder a la aplicación

Abre tu navegador y ve a: [http://localhost:3000](http://localhost:3000)

## Estructura del Repositorio

```
📦 Uniflow-Frontend/
├── 📁 public/
│   ├── favicon.ico
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── 📁 src/
│   ├── 📁 api/
│   │   ├── 📁 auth/
│   │   ├── 📁 notifications/
│   │   ├── 📁 periods/
│   │   ├── 📁 shared/
│   │   ├── 📁 students/
│   │   ├── 📁 subjects/
│   │   └── 📁 tasks/
│   ├── 📁 components/
│   │   ├── 📁 auth/
│   │   ├── 📁 notifications/
│   │   ├── 📁 periods/
│   │   ├── 📁 students/
│   │   ├── 📁 subjects/
│   │   ├── 📁 tasks/
│   │   ├── 📁 ui/
│   │   ├── ... Otros componentes compartidos
│   ├── 📁 domain/
│   │   ├── 📁 auth/
│   │   ├── 📁 notifications/
│   │   ├── 📁 periods/
│   │   ├── 📁 shared/
│   │   ├── 📁 subjects/
│   │   └── 📁 tasks/
│   ├── 📁 hooks/
│   │   ├── 📁 auth/
│   │   ├── 📁 notifications/
│   │   ├── 📁 periods/
│   │   ├── 📁 students/
│   │   ├── 📁 subjects/
│   │   ├── 📁 tasks/
│   │   └── ... Otros hooks genéricos
│   ├── 📁 integrations/
│   │   └── 📁 tanstack-query/
│   ├── 📁 lib/
│   │   ├── 📁 api/
│   │   ├── theme-provider.tsx
│   │   └── utils.ts
│   ├── 📁 routes/
│   │   ├── 📁 auth/
│   │   ├── 📁 dashboard/
│   │   ├── 404.tsx
│   │   ├── index.tsx
│   │   ├── _layout.tsx
│   │   └── __root.tsx
│   ├── 📁 stores/
│   │   ├── 📁 auth/
│   │   ├── 📁 periods/
│   │   ├── 📁 students/
│   │   ├── 📁 subjects/
│   │   ├── 📁 tasks/
│   │   └── auth.ts
│   ├── env.ts
│   ├── logo.svg
│   ├── main.tsx
│   ├── routeTree.gen.ts
│   └── styles.css
├── 📄 components.json
├── 📄 eslint.config.js
├── 📄 index.html
├── 📄 package.json
├── 📄 pnpm-lock.yaml
├── 📄 prettier.config.js
├── 📄 staticwebapp.config.json
├── 📄 tsconfig.json
└── 📄 vite.config.ts
```

## 📚 Recursos Adicionales

- [Documentación React](https://react.dev/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Shadcn/ui Components](https://ui.shadcn.com/)
- [TanStack Router](https://tanstack.com/router)
- [TanStack Query](https://tanstack.com/query)
