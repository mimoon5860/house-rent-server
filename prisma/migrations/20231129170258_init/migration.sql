-- AlterTable
ALTER TABLE `propertybasicinfo` MODIFY `bedRoom` INTEGER NULL,
    MODIFY `bathRoom` INTEGER NULL,
    MODIFY `balcony` INTEGER NULL,
    MODIFY `floor` INTEGER NULL,
    MODIFY `gender` ENUM('Male', 'Female', 'Anyone') NULL,
    MODIFY `size` DOUBLE NULL,
    MODIFY `parking` INTEGER NULL;
