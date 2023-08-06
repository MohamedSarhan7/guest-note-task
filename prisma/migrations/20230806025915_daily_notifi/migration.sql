-- AlterTable
ALTER TABLE `User` ADD COLUMN `recived_daily_notifi` BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX `User_recived_daily_notifi_idx` ON `User`(`recived_daily_notifi`);
