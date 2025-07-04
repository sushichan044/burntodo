# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with the frontend application.

## Architecture Overview

BurnTodo Frontend is a Remix Single Page Application (SPA) deployed on Cloudflare Pages:

- **Framework**: Remix with Vite (v3 features enabled)
- **UI Library**: Mantine UI components with Tailwind CSS
- **Compiler**: React Compiler (experimental) for optimizations
- **Runtime**: Cloudflare Pages with Node.js compatibility
- **Type Safety**: TypeScript with strict configuration
- **Backend Communication**: Service bindings to backend Workers

## Development Commands

### Core Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build with Wrangler
pnpm start

# Deploy to Cloudflare Pages
pnpm deploy
```

### Code Quality

```bash
# Run ESLint
pnpm lint

# Type checking
pnpm typecheck

# Generate Wrangler types (run after wrangler.toml changes)
pnpm typegen
```

## Project Structure

```
app/
├── routes/                    # Remix file-based routing
│   ├── _auth/                # Authentication layout
│   ├── _lp/                  # Landing page layout
│   └── app/                  # Main application
├── components/               # Reusable UI components
│   ├── element/              # Basic elements
│   └── layout/               # Layout components
├── lib/                      # Utility libraries
│   ├── api.ts               # API client configuration
│   ├── cn.ts                # Class name utilities
│   └── session.ts           # Session management
├── const.ts                 # Application constants
├── root.tsx                 # App root with providers
├── sessions.server.ts       # Server-side session handling
└── style.css               # Global styles
```

## Key Technologies

- **Remix**: Full-stack web framework with v3 features
- **Mantine**: Component library with built-in theming
- **Tailwind CSS**: Utility-first styling
- **React Compiler**: Experimental compiler for optimization
- **Conform**: Form validation and handling
- **Zod**: Schema validation
- **Vite**: Build tool and development server

## Configuration Files

- `vite.config.ts`: Vite configuration with Remix and React Compiler
- `wrangler.toml`: Cloudflare Pages deployment configuration
- `tailwind.config.ts`: Tailwind CSS configuration
- `tsconfig.json`: TypeScript configuration
- `eslint.config.mjs`: ESLint configuration
- `postcss.config.cjs`: PostCSS configuration for Mantine

## Development Setup

1. **Environment Variables**: Copy `example.dev.vars` to `.dev.vars`
2. **Cookie Secret**: Set `COOKIE_SECRET` in `.dev.vars`
3. **Backend Connection**: Service binding to `burntodo-backend` configured in `wrangler.toml`

## Routing Structure

- `_auth.*`: Authentication pages (login, signup, logout)
- `_lp.*`: Landing pages
- `app.*`: Main application routes (protected)

## API Integration

- **Backend API**: Accessed via `@repo/api` package with Hono RPC
- **Type Safety**: Full type safety between frontend and backend
- **Service Binding**: Direct connection to backend Workers

## UI Components

- **Mantine Provider**: Global theming and component provider
- **Navigation Progress**: Loading indicators during navigation
- **Color Scheme**: Light mode default with system detection

## Build Process

The application uses Vite for development and building:

1. **Development**: Hot reload with Vite dev server
2. **Production**: Static build for Cloudflare Pages
3. **Deployment**: Wrangler CLI for Pages deployment

## Important Notes

- React Compiler is experimental - monitor for compilation issues
- Always run `pnpm typegen` after modifying `wrangler.toml`
- Service bindings require backend to be deployed first
- Session management uses server-side sessions
