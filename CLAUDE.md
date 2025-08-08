# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development
npm run dev           # Start Next.js dev server with Turbopack
npm run build         # Build production application
npm run start         # Start production server

# Code Quality
npm run lint          # Run ESLint
npm run format        # Format code with Prettier
npm run type-check    # Run TypeScript type checking

# Database
npm run generate      # Generate Drizzle migration files
npm run migrate       # Push schema changes to database
npm run push          # Generate and push migrations in one command
```

## Project Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router and Turbopack
- **Authentication**: Better Auth with organization plugin
- **Database**: Drizzle ORM with dual provider support (PostgreSQL/Neon)
- **UI**: Radix UI components with Tailwind CSS
- **Email**: Resend with React Email templates
- **Forms**: React Hook Form with Zod validation

### Database Configuration
The project uses a flexible database configuration that automatically switches between providers:
- **Development**: PostgreSQL with connection pooling
- **Production**: Neon serverless database
- Override with `DATABASE_PROVIDER` environment variable

Configuration is handled in `src/db/config.ts:44-59` with the `getDatabaseConfig()` function.

### Authentication System
Built on Better Auth with organization support:
- Multi-provider OAuth (Google, Microsoft)
- Email/password authentication
- Organization-based access control with admin/member roles
- Session management with cookie caching
- Automatic admin assignment based on email domain

Key files:
- `src/lib/auth.ts` - Server-side auth configuration
- `src/lib/auth-client.ts` - Client-side auth methods
- `src/lib/permissions.ts` - Role-based access control definitions

### App Structure
- `/app` - Protected application routes (requires authentication via middleware)
- `/auth` - Public authentication pages (login, signup)
- `/app/organizations/[organizationSlug]` - Organization-specific pages
- `/app/organizations/[organizationSlug]/[sectionId]` - Section-specific pages

### Database Schema
Schema is modularized and exported from `src/db/schema/_index.ts`:
- **Auth schemas**: User, session, account, organization, member, invitation
- **Business schemas**: Section, screen (work in progress)
- Uses Drizzle relations for foreign key relationships

### Component Organization
- `src/components/auth/` - Authentication-related components
- `src/components/email/` - Email template components
- `src/components/section/` - Section management components
- `src/components/shared/` - Shared UI components (Header, etc.)
- `src/components/ui/` - Radix UI component wrappers

### Server Actions
Located in `src/server/`:
- Organization management and permissions
- Member and user operations
- Permission checking utilities

## Development Notes

### Database Migrations
- Use `npm run generate` to create migration files after schema changes
- Use `npm run push` to apply migrations to database
- Migration files are stored in `src/db/migrations/`

### Authentication Flow
- Middleware protects `/app/*` routes (defined in `src/middleware.ts:16`)
- Redirects unauthenticated users to home page
- Default post-login redirect is `/app`

### Environment Variables
Required variables (see README.md for database configuration):
- `DATABASE_URL` - Database connection string
- `DATABASE_PROVIDER` - Optional, auto-detected based on NODE_ENV
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` - OAuth credentials
- `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET`, `MICROSOFT_TENANT_ID` - OAuth credentials
- `HOST_ORG_DOMAIN` - Domain for automatic admin assignment
- Email configuration for Resend service

### Testing
Run type checking before committing changes: `npm run type-check`