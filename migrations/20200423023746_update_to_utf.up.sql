ALTER TABLE `TeacherRecords` MODIFY COLUMN `content_title` VARCHAR(255) CHARACTER SET `utf8` COLLATE `utf8_unicode_ci` NOT NULL;
ALTER TABLE `TeacherRecords` MODIFY COLUMN `content_description` VARCHAR(255) CHARACTER SET `utf8` COLLATE `utf8_unicode_ci` NOT NULL;
ALTER TABLE `TeacherRecords` MODIFY COLUMN `cost` VARCHAR(100) CHARACTER SET `utf8` COLLATE `utf8_unicode_ci` NOT NULL;
ALTER TABLE `TeacherRecords` MODIFY COLUMN `medium` VARCHAR(100) CHARACTER SET `utf8` COLLATE `utf8_unicode_ci` NOT NULL;
ALTER TABLE `StudentRecords` MODIFY COLUMN `content_title` VARCHAR(255) CHARACTER SET `utf8` COLLATE `utf8_unicode_ci` NOT NULL;
ALTER TABLE `StudentRecords` MODIFY COLUMN `content_description` VARCHAR(255) CHARACTER SET `utf8` COLLATE `utf8_unicode_ci` NOT NULL;
ALTER TABLE `StudentRecords` MODIFY COLUMN `cost` VARCHAR(100) CHARACTER SET `utf8` COLLATE `utf8_unicode_ci` NOT NULL;
ALTER TABLE `StudentRecords` MODIFY COLUMN `medium` VARCHAR(100) CHARACTER SET `utf8` COLLATE `utf8_unicode_ci` NOT NULL;
ALTER TABLE `StudentRecords` MODIFY COLUMN `subject` VARCHAR(255) CHARACTER SET `utf8` COLLATE `utf8_unicode_ci` NOT NULL;
