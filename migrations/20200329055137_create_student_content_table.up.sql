CREATE TABLE IF NOT EXISTS StudentRecords (
  id int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  content_title varchar(255) NOT NULL,
  content_description varchar(500) NOT NULL,
  content_link varchar(255) NOT NULL,
  startGrade int(3),
  endGrade int(3),
  subject varchar(255),  
  PRIMARY KEY(id)
) AUTO_INCREMENT=1;