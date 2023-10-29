/*
  Warnings:

  - You are about to drop the column `createdAt` on the `property` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[attributeName]` on the table `PropertyBasicAttribute` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `expiryDate` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `property` DROP COLUMN `createdAt`,
    ADD COLUMN `createDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `expiryDate` DATE NOT NULL,
    MODIFY `status` ENUM('Active', 'Inactive', 'Expired', 'Draft') NOT NULL DEFAULT 'Active';

-- AlterTable
ALTER TABLE `user` DROP COLUMN `createdAt`,
    ADD COLUMN `createDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX `PropertyBasicAttribute_attributeName_key` ON `PropertyBasicAttribute`(`attributeName`);
