# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture Overview

`@repo/module` is the core business logic layer that provides:
- Database schema definitions with Drizzle ORM
- UseCase pattern for business logic encapsulation
- Type-safe data validation with Zod schemas
- Authentication utilities for password hashing

## Module Structure

```
packages/module/
├── src/
│   ├── core/
│   │   ├── auth.ts      # Password hashing utilities
│   │   ├── db.ts        # Database configuration
│   │   └── usecase.ts   # Base UseCase class
│   ├── usecase/
│   │   ├── index.ts     # Main UseCase aggregator
│   │   ├── todo.ts      # Todo-related business logic
│   │   └── user.ts      # User-related business logic
│   ├── index.ts         # Main exports (DB factory)
│   ├── schema.ts        # Drizzle table definitions
│   └── zod.ts           # Zod validation schemas
└── package.json
```

## Export Structure

The module provides four main export paths:

1. **Main (`@repo/module`)**: Database factory
   - `createDB()` - Creates configured Drizzle instance
   - `DBType` - Database type definition

2. **Schema (`@repo/module/schema`)**: Table definitions
   - `TB_user`, `TB_todo` - Drizzle table schemas
   - `usersRelations`, `todosRelations` - Relationship definitions

3. **UseCase (`@repo/module/usecase`)**: Business logic
   - `UseCase` - Main aggregator class
   - Input validation schemas for all operations

4. **Zod (`@repo/module/zod`)**: Type definitions
   - Insert/Select types and schemas for all tables

## Usage Patterns

### Database Initialization
```typescript
import { createDB } from "@repo/module";

const db = createDB(D1Database);
```

### UseCase Pattern
```typescript
import { UseCase } from "@repo/module/usecase";

const useCase = new UseCase(db);
await useCase.user.createUser(input, salt);
await useCase.todo.createTodo(input);
```

### Type Safety
```typescript
import type { TB_UserSelect, TB_TodoInsert } from "@repo/module/zod";
import { CreateUserSchema, CreateTodoSchema } from "@repo/module/usecase";

// Input validation
const parsed = CreateUserSchema.safeParse(input);
```

## Key Design Patterns

1. **Result Pattern**: All UseCase methods return `Result<T, string>` for error handling
2. **BaseUseCase**: Shared database access for all UseCase implementations
3. **Schema Validation**: Zod schemas generated from Drizzle tables
4. **Separation of Concerns**: Core utilities, business logic, and data layer separated

## Development Guidelines

- Add new tables to `schema.ts` with proper relations
- Generate corresponding Zod schemas in `zod.ts`
- Implement business logic in appropriate UseCase classes
- Export new schemas and types through `usecase/index.ts`
- Use Result pattern for error handling in UseCase methods
- Follow existing naming conventions (TB_ prefix for tables)

## Dependencies

- `drizzle-orm`: Database ORM
- `@libsql/client`: Database client for D1
- `zod`: Schema validation
- `drizzle-zod`: Zod schema generation
- `bcryptjs`: Password hashing
- `ts-results`: Result pattern implementation