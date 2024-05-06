-- CreateTable
CREATE TABLE "Pdf" (
    "id" SERIAL NOT NULL,
    "clienteId" TEXT NOT NULL,
    "caminho" TEXT NOT NULL,

    CONSTRAINT "Pdf_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pdf" ADD CONSTRAINT "Pdf_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
