/*
  Warnings:

  - You are about to drop the column `propertyId` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Appointment` table. All the data in the column will be lost.
  - Added the required column `idProperty` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idUser` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Appointment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "idUser" INTEGER NOT NULL,
    "idProperty" INTEGER NOT NULL,
    CONSTRAINT "Appointment_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Appointment_idProperty_fkey" FOREIGN KEY ("idProperty") REFERENCES "Property" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Appointment" ("createdAt", "endDate", "id", "startDate", "title", "updatedAt") SELECT "createdAt", "endDate", "id", "startDate", "title", "updatedAt" FROM "Appointment";
DROP TABLE "Appointment";
ALTER TABLE "new_Appointment" RENAME TO "Appointment";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
