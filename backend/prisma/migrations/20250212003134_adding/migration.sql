/*
  Warnings:

  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `name`,
    ADD COLUMN `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `email` VARCHAR(255) NOT NULL,
    ADD COLUMN `fullname` VARCHAR(255) NULL,
    ADD COLUMN `level` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `password` VARCHAR(255) NOT NULL,
    ADD COLUMN `question_answered` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `updatedAt` TIMESTAMP(0) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `email` ON `user`(`email`);
