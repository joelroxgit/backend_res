/*
  Warnings:

  - The values [VEG,NON_VEG] on the enum `tbl_foods_foodType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `tbl_foods` MODIFY `foodType` ENUM('veg', 'nonveg') NOT NULL;
