-- CreateTable
CREATE TABLE "Requirements" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "petId" TEXT NOT NULL,

    CONSTRAINT "Requirements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Requirements_id_key" ON "Requirements"("id");

-- AddForeignKey
ALTER TABLE "Requirements" ADD CONSTRAINT "Requirements_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
