-- CreateTable
CREATE TABLE "Color" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Color_storeId_idx" ON "Color"("storeId");

-- AddForeignKey
ALTER TABLE "Color" ADD CONSTRAINT "Color_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
