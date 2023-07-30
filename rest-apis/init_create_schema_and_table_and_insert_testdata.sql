CREATE SCHEMA IF NOT EXISTS dev;
-- set standard schema for user dev_user:
ALTER USER dev_user SET search_path = dev;

--DROP TABLE dev.users;
--DROP TABLE IF EXISTS dev.users;
CREATE TABLE dev.users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL
);

--DROP TABLE dev.user_groups;
--DROP TABLE IF EXISTS dev.user_groups;
CREATE TABLE dev.user_groups (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

--DROP TABLE dev.user_group_mappings;
--DROP TABLE IF EXISTS dev.user_group_mappings;
CREATE TABLE dev.user_group_mappings (
  user_id INT NOT NULL,
  group_id INT NOT NULL,
  PRIMARY KEY (user_id, group_id),
  FOREIGN KEY (user_id) REFERENCES dev.users(id) ON DELETE CASCADE,
  FOREIGN KEY (group_id) REFERENCES dev.user_groups(id) ON DELETE SET NULL
);

--DROP TABLE dev.user_roles;
--DROP TABLE IF EXISTS dev.user_roles;
CREATE TABLE dev.user_roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

--DROP TABLE dev.user_group_role_mappings;
--DROP TABLE IF EXISTS dev.user_group_role_mappings;
CREATE TABLE dev.user_group_role_mappings (
  group_id INT NOT NULL,
  role_id INT NOT NULL,
  PRIMARY KEY (group_id, role_id),
  FOREIGN KEY (group_id) REFERENCES dev.user_groups(id) ON DELETE SET NULL,
  FOREIGN KEY (role_id) REFERENCES dev.user_roles(id)
);

--DELETE FROM dev.users;
INSERT INTO dev.users (username, email, password) 
VALUES 
  ('john_doe', 'john.doe@example.com', 'password123'),
  ('jane_doe', 'jane.doe@example.com', 'password456'),
  ('bob_smith', 'bob.smith@example.com', 'password789');
 SELECT * FROM dev.users;
 
 --DELETE FROM dev.user_groups;
INSERT INTO dev.user_groups (name)
VALUES 
  ('admins'),
  ('users');
 SELECT * FROM dev.user_groups;
 
--DELETE FROM dev.user_roles;
INSERT INTO dev.user_roles (name)
VALUES 
  ('admin'),
  ('user');
 SELECT * FROM dev.user_roles;

--DELETE FROM dev.user_group_mappings;
INSERT INTO dev.user_group_mappings (user_id, group_id)
VALUES 
  (1, 1),
  (2, 2),
  (3, 2);
 SELECT * FROM dev.user_group_mappings;

--DELETE FROM dev.user_group_role_mappings;
INSERT INTO dev.user_group_role_mappings (group_id, role_id)
VALUES 
  (1, 1),
  (1, 2),
  (2, 2);
 SELECT * FROM dev.user_group_role_mappings;