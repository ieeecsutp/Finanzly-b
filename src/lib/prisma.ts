import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function testConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Conexión a la base de datos establecida correctamente.');
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:\n', error);
    // process.exit(1); // Sale del proceso si no hay conexión
  }
}

export default prisma;