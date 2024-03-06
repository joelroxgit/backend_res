/*
  Warnings:

  - You are about to drop the column `foodItemName` on the `tbl_bills` table. All the data in the column will be lost.
  - Added the required column `foodItemName` to the `tbl_billitems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tbl_billitems` ADD COLUMN `foodItemName` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `tbl_bills` DROP COLUMN `foodItemName`;
