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