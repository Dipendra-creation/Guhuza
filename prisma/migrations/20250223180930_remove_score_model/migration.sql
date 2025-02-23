/*
  Warnings:

  - You are about to drop the `Score` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `description` on table `Badge` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Score` DROP FOREIGN KEY `Score_userId_fkey`;

-- AlterTable
ALTER TABLE `Badge` MODIFY `description` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Score`;
