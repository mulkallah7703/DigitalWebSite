-- AlterTable
ALTER TABLE "Category" ADD COLUMN IF NOT EXISTS "order" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "Category" ADD COLUMN IF NOT EXISTS "visible" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "Category" ADD COLUMN IF NOT EXISTS "metaTitle" TEXT;
ALTER TABLE "Category" ADD COLUMN IF NOT EXISTS "metaDescription" TEXT;

-- CreateIndex
CREATE INDEX IF NOT EXISTS "Category_visible_idx" ON "Category"("visible");
CREATE INDEX IF NOT EXISTS "Category_order_idx" ON "Category"("order");
