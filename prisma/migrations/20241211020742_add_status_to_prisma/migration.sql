-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Business" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "business_type" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "license" TEXT,
    "district" TEXT NOT NULL,
    "lat" REAL,
    "lng" REAL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Business" ("business_type", "createdAt", "district", "id", "lat", "license", "lng", "name", "type", "updatedAt") SELECT "business_type", "createdAt", "district", "id", "lat", "license", "lng", "name", "type", "updatedAt" FROM "Business";
DROP TABLE "Business";
ALTER TABLE "new_Business" RENAME TO "Business";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
