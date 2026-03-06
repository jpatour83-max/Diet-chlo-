import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import path from 'path'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient() {
  const dbPath = process.env.DATABASE_URL || 'file:./dev.db'
  const dbFile = dbPath.replace('file:', '')
  const absolutePath = path.isAbsolute(dbFile)
    ? dbFile
    : path.join(process.cwd(), dbFile)

  const adapter = new PrismaLibSql({ url: `file:${absolutePath}` })
  return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
