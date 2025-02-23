/*
  Warnings:

  - You are about to drop the column `awardedAt` on the `Badge` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Badge` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Badge` DROP FOREIGN KEY `Badge_userId_fkey`;

-- DropIndex
DROP INDEX `Badge_userId_fkey` ON `Badge`;

-- AlterTable
ALTER TABLE `Badge` DROP COLUMN `awardedAt`,
    DROP COLUMN `userId`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `description` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `UserBadge` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `awardedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` INTEGER NOT NULL,
    `badgeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserBadge` ADD CONSTRAINT `UserBadge_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserBadge` ADD CONSTRAINT `UserBadge_badgeId_fkey` FOREIGN KEY (`badgeId`) REFERENCES `Badge`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
