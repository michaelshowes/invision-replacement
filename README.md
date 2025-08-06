This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Database Configuration

This project supports multiple database providers with automatic environment-based switching:

### Environment Variables

```env
# Required: Database connection URL
DATABASE_URL="postgresql://user:password@localhost:5432/database"

# Optional: Explicitly set database provider
# Values: 'postgres' (default for development) or 'neon' (default for production)
# If not set, will use 'postgres' for development and 'neon' for production
DATABASE_PROVIDER="postgres"
```

### Development Setup (PostgreSQL)

For local development, use PostgreSQL with connection pooling:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/database"
DATABASE_PROVIDER="postgres"  # Optional, default for development
```

### Production Setup (Neon)

For production, use Neon serverless:

```env
DATABASE_URL="postgresql://user:password@your-neon-instance/database"
DATABASE_PROVIDER="neon"  # Optional, default for production
```

### Automatic Switching

The system automatically chooses the database provider based on `NODE_ENV`:

- `NODE_ENV=development` → Uses `postgres` provider
- `NODE_ENV=production` → Uses `neon` provider

You can override this behavior by setting `DATABASE_PROVIDER` explicitly.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
