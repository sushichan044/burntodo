# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## API Package Architecture

`@repo/api` is a Hono-based API package that provides both server and client exports for type-safe communication between frontend and backend.

### Package Structure

```
src/
├── server.ts      # Main server app with route definitions
├── client.ts      # RPC client factory for type-safe API calls
├── hono.ts        # Hono factory with middleware and DI setup
└── routers/       # Feature-based route handlers
    ├── auth.ts    # Authentication endpoints
    ├── todo.ts    # Todo CRUD operations
    └── user.ts    # User management endpoints
```

### Key Architecture Patterns

#### Hono RPC Integration
- Server exports typed routes for RPC client generation
- Client factory creates type-safe API clients using `hc<typeof routes>`
- Compile server code before using client for proper type inference

#### Dependency Injection
- `honoFactory` provides centralized middleware and DI setup
- UseCase instances injected via context variables
- Database bindings passed through Cloudflare Workers environment

#### Route Organization
- Feature-based router modules (`/auth`, `/todo`, `/user`)
- Consistent response format: `{ data: T | null, error: string | null }`
- Zod validation for request parameters and bodies

#### Middleware Stack
- CORS, CSRF protection, secure headers
- Database and UseCase injection
- Request validation with `@hono/zod-validator`

### Development Commands

```bash
# Lint the API package
pnpm lint

# Type check (run from root)
pnpm typecheck
```

### Usage Patterns

#### Adding New Routes
1. Create router in `src/routers/` following existing patterns
2. Export router and import in `src/server.ts`
3. Add route to main app with `.route()` method
4. Use zod schemas from `@repo/module/usecase` for validation

#### Environment Dependencies
- `DB`: D1Database binding for database access
- `PASSWORD_SALT`: Secret for password hashing
- UseCase dependency injection handles business logic

#### Type Safety
- Server routes automatically typed for RPC client
- Validation schemas ensure runtime type safety
- Context variables provide typed access to dependencies