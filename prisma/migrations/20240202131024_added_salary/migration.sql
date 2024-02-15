/*
  Warnings:

  - Added the required column `salary` to the `tbl_users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tbl_users` ADD COLUMN `salary` INTEGER NOT NULL;
