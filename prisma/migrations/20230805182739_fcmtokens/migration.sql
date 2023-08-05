-- DropIndex
DROP INDEX `NoteToUser_created_at_user_id_idx` ON `NoteToUser`;

-- AlterTable
ALTER TABLE `NoteToUser` ADD COLUMN `avilable` BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE `FCMTokens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `NoteToUser_created_at_user_id_avilable_idx` ON `NoteToUser`(`created_at`, `user_id`, `avilable`);

-- AddForeignKey
ALTER TABLE `FCMTokens` ADD CONSTRAINT `FCMTokens_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
