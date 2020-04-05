ALTER TABLE `TeacherRecords` ADD `cost` varchar(100) NOT NULL;
ALTER TABLE `TeacherRecords` ADD `device` int(3) NOT NULL DEFAULT 0;
ALTER TABLE `StudentRecords` ADD `cost` varchar(100) NOT NULL;
ALTER TABLE `StudentRecords` ADD `device` int(3) NOT NULL DEFAULT 0;