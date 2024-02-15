/*
  Warnings:

  - You are about to drop the `bill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `billitem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `fooditem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `bill` DROP FOREIGN KEY `Bill_userId_fkey`;

-- DropForeignKey
ALTER TABLE `billitem` DROP FOREIGN KEY `BillItem_billId_fkey`;

-- DropForeignKey
ALTER TABLE `billitem` DROP FOREIGN KEY `BillItem_foodItemId_fkey`;

-- DropTable
DROP TABLE `bill`;

-- DropTable
DROP TABLE `billitem`;

-- DropTable
DROP TABLE `fooditem`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `tbl_foods` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `imageUrl` VARCHAR(191) NULL,
    `availability` BOOLEAN NOT NULL DEFAULT true,
    `category` ENUM('APPETIZER', 'MAIN_COURSE', 'DESSERT') NOT NULL,
    `foodType` ENUM('VEG', 'NON_VEG') NOT NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` BIGINT NOT NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `tbl_users_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_bills` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `total` DOUBLE NOT NULL,
    `gst` DOUBLE NOT NULL,
    `discount` DOUBLE NOT NULL,
    `netAmount` DOUBLE NOT NULL,
    `customerName` VARCHAR(191) NOT NULL,
    `mobileNumber` VARCHAR(191) NOT NULL,
    `billDate` DATETIME(3) NOT NULL,
    `userId` INTEGER NOT NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_billitems` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantity` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `billId` INTEGER NOT NULL,
    `foodItemId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_bills` ADD CONSTRAINT `tbl_bills_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `tbl_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_billitems` ADD CONSTRAINT `tbl_billitems_billId_fkey` FOREIGN KEY (`billId`) REFERENCES `tbl_bills`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_billitems` ADD CONSTRAINT `tbl_billitems_foodItemId_fkey` FOREIGN KEY (`foodItemId`) REFERENCES `tbl_foods`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
