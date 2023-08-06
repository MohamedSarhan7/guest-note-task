-- DropForeignKey
ALTER TABLE `NoteToUser` DROP FOREIGN KEY `NoteToUser_note_id_fkey`;

-- DropForeignKey
ALTER TABLE `NoteToUser` DROP FOREIGN KEY `NoteToUser_user_id_fkey`;

-- AddForeignKey
ALTER TABLE `NoteToUser` ADD CONSTRAINT `NoteToUser_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NoteToUser` ADD CONSTRAINT `NoteToUser_note_id_fkey` FOREIGN KEY (`note_id`) REFERENCES `Note`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
