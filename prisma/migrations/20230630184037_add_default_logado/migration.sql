-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PESSOAS" (
    "CODPES" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "NOME" TEXT NOT NULL,
    "SOBRENOME" TEXT NOT NULL,
    "CPF" TEXT NOT NULL,
    "TELEFONE" TEXT NOT NULL,
    "CODEND" INTEGER,
    CONSTRAINT "PESSOAS_CODEND_fkey" FOREIGN KEY ("CODEND") REFERENCES "ENDERECOS" ("CODEND") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_PESSOAS" ("CODEND", "CODPES", "CPF", "NOME", "SOBRENOME", "TELEFONE") SELECT "CODEND", "CODPES", "CPF", "NOME", "SOBRENOME", "TELEFONE" FROM "PESSOAS";
DROP TABLE "PESSOAS";
ALTER TABLE "new_PESSOAS" RENAME TO "PESSOAS";
CREATE UNIQUE INDEX "PESSOAS_CPF_key" ON "PESSOAS"("CPF");
CREATE UNIQUE INDEX "PESSOAS_CODEND_key" ON "PESSOAS"("CODEND");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
