-- DropForeignKey
ALTER TABLE `member` DROP FOREIGN KEY `Member_areaId_fkey`;

-- AlterTable
ALTER TABLE `member` MODIFY `areaId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Member` ADD CONSTRAINT `Member_areaId_fkey` FOREIGN KEY (`areaId`) REFERENCES `Area`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
