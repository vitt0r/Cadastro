/*
  Warnings:

  - You are about to drop the `Endereco` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pessoa` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Endereco";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Pessoa";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "PESSOAS" (
    "CODPES" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "NOME" TEXT NOT NULL,
    "SOBRENOME" TEXT NOT NULL,
    "CPF" TEXT NOT NULL,
    "TELEFONE" TEXT NOT NULL,
    "CODEND" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "ENDERECOS" (
    "CODEND" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "CEP" TEXT NOT NULL,
    "ENDERECO" TEXT NOT NULL,
    "NUMERO" INTEGER NOT NULL,
    "BAIRRO" TEXT NOT NULL,
    "UF" TEXT NOT NULL,
    "ESTADO" TEXT NOT NULL,
    "COMPLEMENTO" TEXT NOT NULL,
    CONSTRAINT "ENDERECOS_CODEND_fkey" FOREIGN KEY ("CODEND") REFERENCES "PESSOAS" ("CODEND") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "PESSOAS_CPF_key" ON "PESSOAS"("CPF");

-- CreateIndex
CREATE UNIQUE INDEX "PESSOAS_CODEND_key" ON "PESSOAS"("CODEND");
