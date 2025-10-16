let prisma

function initPrisma() {
  if (prisma) return prisma
  try {
    const { PrismaClient } = require('@prisma/client')
    const globalForPrisma = global
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = new PrismaClient()
    }
    prisma = globalForPrisma.prisma
    return prisma
  } catch (err) {
    console.error('Prisma initialization failed:', err && err.message ? err.message : err)
    // return null to indicate prisma isn't available
    return null
  }
}

function getPrisma() {
  return prisma || initPrisma()
}

module.exports = { getPrisma }
