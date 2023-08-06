/*
  Warnings:

  - You are about to drop the column `recived_daily_notifi` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `User_recived_daily_notifi_idx` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `recived_daily_notifi`,
    ADD COLUMN `receive_daily_notifi` BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX `User_receive_daily_notifi_idx` ON `User`(`receive_daily_notifi`);
