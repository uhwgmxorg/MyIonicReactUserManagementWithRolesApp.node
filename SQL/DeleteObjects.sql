--DROP DATABASE devicesdb;

DELETE FROM dev.user_group_mappings;
DELETE FROM dev.user_group_role_mappings;
DELETE FROM dev.users;
DELETE FROM dev.user_groups;
DELETE FROM dev.user_roles;


DROP TABLE IF EXISTS dev.user_group_mappings;
DROP TABLE IF EXISTS dev.user_group_role_mappings;
DROP TABLE IF EXISTS dev.users;
DROP TABLE IF EXISTS dev.user_groups;
DROP TABLE IF EXISTS dev.user_roles;
