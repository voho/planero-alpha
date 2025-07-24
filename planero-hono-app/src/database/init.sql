INSERT INTO user (id, name, gender, born_at, email)
VALUES ('user_2zC9oYRyNupQeKlkMQB0YqI5esr', 'Táta Testovací', 'm', '1980-01-01', 'tata@test.test');
INSERT INTO user (id, name, gender, born_at, email)
VALUES ('test-mother', 'Máma Testovací', 'f', '1983-01-01', 'mama@test.test');
INSERT INTO user (id, name, gender, born_at, email)
VALUES ('test-son', 'Syn Testovací', 'm', '2020-01-01', 'syn@test.test');
INSERT INTO user (id, name, gender, born_at, email)
VALUES ('test-daughter', 'Dcera Testovací', 'f', '2017-01-01', 'dcera@test.test');

INSERT INTO family (id, name)
VALUES ('test-family', "Testovací rodina");

INSERT INTO user_to_family (user_id, family_id, role)
VALUES ('user_2zC9oYRyNupQeKlkMQB0YqI5esr', 'test-family', "adult");
INSERT INTO user_to_family (user_id, family_id, role)
VALUES ('test-mother', 'test-family', "adult");
INSERT INTO user_to_family (user_id, family_id, role)
VALUES ('test-son', 'test-family', "child");
INSERT INTO user_to_family (user_id, family_id, role)
VALUES ('test-daughter', 'test-family', "child");