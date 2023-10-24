/*
  Warnings:

  - The values [Inactive] on the enum `Property_status` will be removed. If these variants are still used in the database, this will fail.
  - The values [Expired,Draft] on the enum `User_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `property` MODIFY `status` ENUM('Active', 'Expired', 'Draft') NOT NULL DEFAULT 'Active';

-- AlterTable
ALTER TABLE `user` MODIFY `status` ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active';
