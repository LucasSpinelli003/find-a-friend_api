-- CreateTable
CREATE TABLE "PetPhotos" (
    "id" TEXT NOT NULL,
    "convertedPhoto" TEXT NOT NULL,
    "petId" TEXT NOT NULL,

    CONSTRAINT "PetPhotos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PetPhotos_id_key" ON "PetPhotos"("id");

-- AddForeignKey
ALTER TABLE "PetPhotos" ADD CONSTRAINT "PetPhotos_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
