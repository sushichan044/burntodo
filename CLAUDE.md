# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture Overview

BurnTodo is a monorepo example demonstrating loosely coupled frontend and backend architecture on Cloudflare:

- **Backend**: Hono-based API deployed on Cloudflare Workers with D1 database
- **Frontend**: Remix SPA deployed on Cloudflare Pages
- **Communication**: Service Bindings + Hono RPC for type-safe internal API calls
- **Database**: Cloudflare D1 with Drizzle ORM for schema management

### Monorepo Structure

```
apps/
├── backend/     # Hono Worker API (entry point to @repo/api)
└── frontend/    # Remix Pages app (consumes @repo/api)
packages/
├── api/         # Hono RPC server & client definitions
└── module/      # Database layer & core business logic
```

## Common Commands

### Development

```bash
# Start all services in development
pnpm dev

# Build all packages
pnpm build

# Lint all packages
pnpm lint

# Format code
pnpm format

# Deploy all services
pnpm deploy
```

### Database Operations (Backend)

```bash
# Generate migrations
cd apps/backend && pnpm db:migrate

# Apply migrations locally
cd apps/backend && pnpm db:push

# Apply migrations to remote
cd apps/backend && pnpm db:push-remote
```

### Individual Package Commands

```bash
# Backend development
cd apps/backend && pnpm dev

# Frontend development
cd apps/frontend && pnpm dev

# Frontend type checking
cd apps/frontend && pnpm typecheck

# Generate Wrangler types
cd apps/frontend && pnpm typegen

# Frontend linting (ESLint)
cd apps/frontend && pnpm lint

# Frontend build for production
cd apps/frontend && pnpm build

# Frontend local preview with Wrangler
cd apps/frontend && pnpm start
```

## Development Setup Requirements

1. **Frontend Setup**: Copy `apps/frontend/example.dev.vars` to `.dev.vars` and configure `COOKIE_SECRET`
2. **Backend Setup**:
   - Create D1 database via `wrangler d1 create`
   - Configure `wrangler.toml` and `drizzle.config.ts` with database details
   - Set `PASSWORD_SALT` secret

## Key Technologies

- **Package Management**: pnpm with workspaces
- **Build System**: Turborepo
- **Frontend**: Remix, React 19, Mantine UI, Tailwind CSS
- **Backend**: Hono, Cloudflare Workers
- **Database**: Drizzle ORM with Cloudflare D1
- **Type Safety**: Hono RPC for API contracts
- **Deployment**: Cloudflare Pages + Workers

## Workspace Dependencies

Packages use workspace protocol (`workspace:^`) for internal dependencies:

- `@repo/api` - Exported as client/server modules
- `@repo/module` - Exported as index/schema/usecase/zod modules
