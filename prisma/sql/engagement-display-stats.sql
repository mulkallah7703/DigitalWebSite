-- Additive, idempotent. Safe to run more than once on Neon (db push, no migration history).
ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "useManualStats" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "displayRating" DECIMAL(2,1);
ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "displayReviewCount" INTEGER;
ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "displaySalesCount" INTEGER;
