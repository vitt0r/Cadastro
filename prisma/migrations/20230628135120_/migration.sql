/*
  Warnings:

  - A unique constraint covering the columns `[EMAIL]` on the table `USUARIOS` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "USUARIOS_EMAIL_key" ON "USUARIOS"("EMAIL");
