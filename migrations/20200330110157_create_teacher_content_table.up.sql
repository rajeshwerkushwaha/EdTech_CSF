CREATE TABLE IF NOT EXISTS TeacherRecords (
  id int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  content_title varchar(255) NOT NULL,
  content_description varchar(500) NOT NULL,
  content_link varchar(255) NOT NULL,
  use_case varchar(255) NOT NULL,
  PRIMARY KEY(id)
) AUTO_INCREMENT=1;
