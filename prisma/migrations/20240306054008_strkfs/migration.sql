/*
  Warnings:

  - You are about to drop the column `foodItemName` on the `tbl_billitems` table. All the data in the column will be lost.
  - Added the required column `foodItemName` to the `tbl_bills` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tbl_billitems` DROP COLUMN `foodItemName`;

-- AlterTable
ALTER TABLE `tbl_bills` ADD COLUMN `foodItemName` VARCHAR(191) NOT NULL;
