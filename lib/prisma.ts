
import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

// FIX: Replaced `global` with `globalThis` to avoid "Cannot find name 'global'" TypeScript error.
const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  // FIX: Replaced `global` with `globalThis` for consistency and to resolve TS errors.
  globalThis.prisma = prisma;
}

export default prisma;