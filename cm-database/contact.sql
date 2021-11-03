CREATE TABLE Contact(
	contactId INT PRIMARY KEY AUTO_INCREMENT,
	contactFirstname VARCHAR(60),
	contactLastname VARCHAR(60),
	contactEmail VARCHAR(60),
	contactPhoneNumber VARCHAR(60), 
	contactNotes VARCHAR(60)
);

INSERT INTO Contact(contactFirstname, contactLastname, contactEmail, contactPhoneNumber, contactNotes) VALUES("John", "Doe", "testing1@test.ca", "604-999-9999", "Test1");
INSERT INTO Contact(contactFirstname, contactLastname, contactEmail, contactPhoneNumber, contactNotes) VALUES("Jane", "Doe", "testing2@test.ca", "778-999-9999", "Test2");

ALTER USER 'user' IDENTIFIED WITH mysql_native_password BY 'password';

flush privileges;