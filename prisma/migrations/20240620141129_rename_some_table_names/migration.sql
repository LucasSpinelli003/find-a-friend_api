/*
  Warnings:

  - You are about to drop the `PetPhotos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Requirements` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PetPhotos" DROP CONSTRAINT "PetPhotos_petId_fkey";

-- DropForeignKey
ALTER TABLE "Requirements" DROP CONSTRAINT "Requirements_petId_fkey";

-- DropTable
DROP TABLE "PetPhotos";

-- DropTable
DROP TABLE "Requirements";

-- CreateTable
CREATE TABLE "requirements" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "petId" TEXT NOT NULL,

    CONSTRAINT "requirements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pet_photos" (
    "id" TEXT NOT NULL,
    "convertedPhoto" TEXT NOT NULL,
    "petId" TEXT NOT NULL,

    CONSTRAINT "pet_photos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "requirements_id_key" ON "requirements"("id");

-- CreateIndex
CREATE UNIQUE INDEX "pet_photos_id_key" ON "pet_photos"("id");

-- AddForeignKey
ALTER TABLE "requirements" ADD CONSTRAINT "requirements_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pet_photos" ADD CONSTRAINT "pet_photos_petId_fkey" FOREIGN KEY ("petId") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
