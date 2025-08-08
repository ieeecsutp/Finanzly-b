-- AddForeignKey
ALTER TABLE "public"."Registro" ADD CONSTRAINT "Registro_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "public"."Categoria"("id_categoria") ON DELETE RESTRICT ON UPDATE CASCADE;
