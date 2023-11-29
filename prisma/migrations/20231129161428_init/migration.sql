/*
  Warnings:

  - You are about to drop the `propertybasicattribute` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `propertybasicattributevalue` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `propertybasicattributevalue` DROP FOREIGN KEY `PropertyBasicAttributeValue_attributeId_fkey`;

-- DropForeignKey
ALTER TABLE `propertybasicattributevalue` DROP FOREIGN KEY `PropertyBasicAttributeValue_propertyId_fkey`;

-- DropTable
DROP TABLE `propertybasicattribute`;

-- DropTable
DROP TABLE `propertybasicattributevalue`;

-- CreateTable
CREATE TABLE `PropertyBasicInfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `availableFrom` DATE NOT NULL,
    `propertyType` ENUM('Sublet', 'Bachelor', 'Family', 'Office', 'Hostel', 'Shop') NOT NULL,
    `bedRoom` INTEGER NOT NULL,
    `bathRoom` INTEGER NOT NULL,
    `balcony` INTEGER NOT NULL,
    `floor` INTEGER NOT NULL,
    `gender` ENUM('Male', 'Female', 'Anyone') NOT NULL,
    `size` DOUBLE NOT NULL,
    `parking` INTEGER NOT NULL,
    `propertyId` INTEGER NOT NULL,

    UNIQUE INDEX `PropertyBasicInfo_propertyId_key`(`propertyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PropertyBasicInfo` ADD CONSTRAINT `PropertyBasicInfo_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `Property`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
