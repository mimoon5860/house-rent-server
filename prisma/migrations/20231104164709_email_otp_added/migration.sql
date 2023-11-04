-- CreateTable
CREATE TABLE `EmailOTP` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `createDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `hashedOtp` VARCHAR(191) NOT NULL,
    `type` ENUM('Reset_Member', 'Reset_Admin', 'Verify_Member', 'Verify_Admin') NOT NULL,
    `matched` BOOLEAN NOT NULL,
    `tried` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
