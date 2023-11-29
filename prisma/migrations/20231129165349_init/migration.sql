/*
  Warnings:

  - The values [Sublet,Bachelor,Family,Office,Hostel,Shop] on the enum `PropertyBasicInfo_propertyType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `propertybasicinfo` MODIFY `propertyType` ENUM('House', 'Room', 'Flat', 'Seat', 'Apartment', 'Floor') NOT NULL;
