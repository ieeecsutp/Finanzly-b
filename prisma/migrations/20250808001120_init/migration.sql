-- CreateTable
CREATE TABLE "public"."Usuario" (
    "id_usuario" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "contraseña" TEXT NOT NULL,
    "fecha_creado" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "public"."Categoria" (
    "id_categoria" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id_categoria")
);

-- CreateTable
CREATE TABLE "public"."Registro" (
    "id_registro" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "id_categoria" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "monto" DECIMAL(65,30) NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Registro_pkey" PRIMARY KEY ("id_registro")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_correo_key" ON "public"."Usuario"("correo");

-- AddForeignKey
ALTER TABLE "public"."Registro" ADD CONSTRAINT "Registro_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "public"."Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;
