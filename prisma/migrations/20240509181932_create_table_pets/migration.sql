-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "fv_food" TEXT NOT NULL,
    "birth" TIMESTAMP(3),

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);
