-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "organizationId" TEXT;

-- CreateTable
CREATE TABLE "organizations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "phone" TEXT NOT NULL,
    "localization" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organizations_id_key" ON "organizations"("id");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
