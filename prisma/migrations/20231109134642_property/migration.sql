-- AlterTable
ALTER TABLE `property` MODIFY `status` ENUM('Active', 'Inactive', 'Expired', 'Draft') NOT NULL DEFAULT 'Draft';
