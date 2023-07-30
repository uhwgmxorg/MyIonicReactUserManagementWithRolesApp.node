"use strict";

const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const packageJson = require('./package.json');

const config = require('./config.js');

const PORT = config.port || 8081;
const server = express();
server.use(bodyParser.json());

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const { postgresqlGetAllUsers, postgresqlGetUsersById, postgresqlCreateNewUser, postgresqlUpdateExistingUser, postgresqlDeleteExistingUser,
    postgresqlGetAllGroups, postgresqlGetGroupsById, postgresqlCreateNewGroup, postgresqlUpdateExistingGroup, postgresqlDeleteExistingGroup,
    postgresqlGetAllRoles, postgresqlGetRolesById, postgresqlCreateNewRole, postgresqlUpdateExistingRole, postgresqlDeleteExistingRole,
    postgresqlGetAllUserGroupMappings, postgresqlCreateUserGroupMappings, postgresqlDeleteExistingUserGroupMappings,
    postgresqlGetAllUserGroupRoleMappings, postgresqlCreateGroupRoleMappings, postgresqlDeleteExistingGroupRoleMappings
} = require('./postgresqlDataService');
const { jsonGetAllUsers, jsonGetUsersById, jsonCreateNewUser, jsonUpdateExistingUser, jsonDeleteExistingUser } = require('./jsonDataService');

let counter = 0;
let dataSource = config.dataSource;
let payload = "";

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/*******************************************************************************/
/*** Important note on Windows use curl command in CMD NOT in the PowerShell ***/
/*******************************************************************************/
/*******************/
/****** USERS ******/
/*******************/
// GET: Get all users
// curl -X GET -H "Content-Type: application/json" -d "" http://localhost:8081/rest-api/users
server.get('/rest-api/users', async (req, res) => {
    try {
        var users;
        switch (dataSource) {
            case "postgresql":
                users = await postgresqlGetAllUsers();
                break;
            case "json":
                users = await jsonGetAllUsers();
                break;
        }
        res.json(users);
        console.log("get /rest-api/users [GetAllUsers] was called " + ++counter + " times\npayload:" + users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// GET: Get an individual user by ID
// curl -X GET -H "Content-Type: application/json" -d "" http://localhost:8081/rest-api/users/1
server.get('/rest-api/users/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        var user;
        switch (dataSource) {
            case "postgresql":
                user = await postgresqlGetUsersById(id);
                break;
            case "json":
                user = await jsonGetUsersById(id);
                break;
        }
        res.json(user);
        console.log("get /rest-api/users/ [GetUsersById]" + id + " was called " + ++counter + " times\npayload:" + user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// POST: Create new user
// curl example:
// curl -X POST -H "Content-Type: application/json" -d "{\"username\": \"neuerBenutzer\", \"email\": \"neuerbenutzer@example.com\", \"password\": \"meinPasswort\"}" http://localhost:8081/rest-api/users
server.post('/rest-api/users', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        var user;
        switch (dataSource) {
            case "postgresql":
                user = await postgresqlCreateNewUser(username, email, password);
                break;
            case "json":
                user = await jsonCreateNewUser(username, email, password);
                break;
        }
        res.json(user);
        console.log("post /rest-api/users [CreateNewUser]" + username + " " + email + " was called " + ++counter);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// PUT: Update existing user
// curl example:
// curl -X PUT -H "Content-Type: application/json" -d "{\"username\": \"New User\", \"email\": \"neueEmail@example.com\", \"password\": \"neuesPasswort\"}" http://localhost:8081/rest-api/users/1
server.put('/rest-api/users/:id', async (req, res) => {
    try {
    const id = parseInt(req.params.id, 10);
    const { username, email, password } = req.body;
    var user;
    switch (dataSource) {
        case "postgresql":
            user = await postgresqlUpdateExistingUser(id, username, email, password);
            break;
        case "json":
            user = await jsonUpdateExistingUser(id, username, email, password);
            break;
    }
    res.json(user);
    console.log("put /rest-api/users [UpdateExistingUser]" + id + " " + username + " " + email + " was called " + ++counter + " times\npayload:" + user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// DELETE: Delete existing user
// curl example (Note foreign key: user_group_mappings_user_id_fkey (index)):
// curl -X DELETE http://localhost:8081/rest-api/users/1 
server.delete('/rest-api/users/:id', async (req, res) => {
    try {
    const id = parseInt(req.params.id, 10);
    switch (dataSource) {
        case "postgresql":
            await postgresqlDeleteExistingUser(id);
            break;
        case "json":
            await jsonDeleteExistingUser(id);
            break;
    }
    res.json({ message: `User ${id} has been deleted` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});
/*******************/
/****** USERS ******/
/*******************/

/*************************/
/****** User Groups ******/
/*************************/
// GET: Get all groups
// curl -X GET -H "Content-Type: application/json" -d "" http://localhost:8081/rest-api/groups
server.get('/rest-api/groups', async (req, res) => {
    try {
    var groups;
    switch (dataSource) {
        case "postgresql":
            groups = await postgresqlGetAllGroups();
            break;
        case "json":
            console.log("Not Implemented");
            break;
    }
    res.json(groups);
    console.log("get /rest-api/groups [GetAllGroups] was called " + ++counter + " times\npayload:" + groups);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// GET: Get an individual group by ID
// curl -X GET -H "Content-Type: application/json" -d "" http://localhost:8081/rest-api/groups/1
server.get('/rest-api/groups/:id', async (req, res) => {
    try {
    const id = parseInt(req.params.id, 10);
    var group;
    switch (dataSource) {
        case "postgresql":
            group = await postgresqlGetGroupsById(id);
            break;
        case "json":
            console.log("Not Implemented");
            break;
    }
    res.json(group);
    console.log("get /rest-api/groups/ [GetGroupsById]" + id + " was called " + ++counter + " times\npayload:" + group);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// POST: Create new group
// curl example:
// curl -X POST -H "Content-Type: application/json" -d "{\"name\": \"New Group\"}" http://localhost:8081/rest-api/groups
server.post('/rest-api/groups', async (req, res) => {
    try {
    const { name } = req.body;
    var group;
    switch (dataSource) {
        case "postgresql":
            group = await postgresqlCreateNewGroup(name);
            break;
        case "json":
            console.log("Not Implemented");
            break;
    }
    res.json(group);
    console.log("post /rest-api/groups [CreateNewGroup]" + name + " was called " + ++counter);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// PUT: Update existing group
// curl example:
// curl -X PUT -H "Content-Type: application/json" -d "{\"name\": \"New Group Name \"}" http://localhost:8081/rest-api/groups/1
server.put('/rest-api/groups/:id', async (req, res) => {
    try {
    const id = parseInt(req.params.id, 10);
    const { name } = req.body;
    var group;
    switch (dataSource) {
        case "postgresql":
            group = await postgresqlUpdateExistingGroup(id, name);
            break;
        case "json":
            console.log("Not Implemented");
            break;
    }
    res.json(group);
    console.log("put /rest-api/groups [UpdateExistingGroup]" + id + " " + name + " was called " + ++counter + " times\npayload:" + group);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// DELETE: Delete existing group
// curl example (Note foreign key: user_group_mappings_user_id_fkey (index)):
// curl -X DELETE http://localhost:8081/rest-api/groups/1 
server.delete('/rest-api/groups/:id', async (req, res) => {
    try {
    const id = parseInt(req.params.id, 10);
    switch (dataSource) {
        case "postgresql":
            await postgresqlDeleteExistingGroup(id);
            break;
        case "json":
            console.log("Not Implemented");
            break;
    }
    res.json({ message: `Group ${id} has been deleted` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});
/*************************/
/****** User Groups ******/
/*************************/

/************************/
/****** User Roles ******/
/************************/
// GET: Get all roles
// curl -X GET -H "Content-Type: application/json" -d "" http://localhost:8081/rest-api/roles
server.get('/rest-api/roles', async (req, res) => {
    try {
    var roles;
    switch (dataSource) {
        case "postgresql":
            roles = await postgresqlGetAllRoles();
            break;
        case "json":
            console.log("Not Implemented");
            break;
    }
    res.json(roles);
    console.log("get /rest-api/roles [GetAllRoles] was called " + ++counter + " times\npayload:" + roles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// GET: Get an individual role by ID
// curl -X GET -H "Content-Type: application/json" -d "" http://localhost:8081/rest-api/roles/1
server.get('/rest-api/roles/:id', async (req, res) => {
    try {
    const id = parseInt(req.params.id, 10);
    var role;
    switch (dataSource) {
        case "postgresql":
            role = await postgresqlGetRolesById(id);
            break;
        case "json":
            console.log("Not Implemented");
            break;
    }
    res.json(role);
    console.log("get /rest-api/roles/ [GetRolesById]" + id + " was called " + ++counter + " times\npayload:" + role);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// POST: Create new role
// curl example:
// curl -X POST -H "Content-Type: application/json" -d "{\"name\": \"New Role\"}" http://localhost:8081/rest-api/roles
server.post('/rest-api/roles', async (req, res) => {
    try {
    const { name } = req.body;
    var role;
    switch (dataSource) {
        case "postgresql":
            role = await postgresqlCreateNewRole(name);
            break;
        case "json":
            console.log("Not Implemented");
            break;
    }
    res.json(role);
    console.log("post /rest-api/roles [CreateNewRole]" + name + " was called " + ++counter);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// PUT: Update existing role
// curl example:
// curl -X PUT -H "Content-Type: application/json" -d "{\"name\": \"New Role Name \"}" http://localhost:8081/rest-api/roles/1
server.put('/rest-api/roles/:id', async (req, res) => {
    try {
    const id = parseInt(req.params.id, 10);
    const { name } = req.body;
    var role;
    switch (dataSource) {
        case "postgresql":
            role = await postgresqlUpdateExistingRole(id, name);
            break;
        case "json":
            console.log("Not Implemented");
            break;
    }
    res.json(role);
    console.log("put /rest-api/roles [UpdateExistingRole]" + id + " " + name + " was called " + ++counter + " times\npayload:" + role);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// DELETE: Delete existing role
// curl -X DELETE http://localhost:8081/rest-api/roles/1 
server.delete('/rest-api/roles/:id', async (req, res) => {
    try {
    const id = parseInt(req.params.id, 10);
    switch (dataSource) {
        case "postgresql":
            await postgresqlDeleteExistingRole(id);
            break;
        case "json":
            console.log("Not Implemented");
            break;
    }
    res.json({ message: `Role ${id} has been deleted` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});
/************************/
/****** User Roles ******/
/************************/

/*********************************/
/****** User Group Mappings ******/
/*********************************/
// GET: Get all User Group Mappings
// curl -X GET -H "Content-Type: application/json" -d "" http://localhost:8081/rest-api/group_mappings
// or 
// curl -X GET -H "Content-Type: application/json" -d "" http://localhost:8081/rest-api/group_mappings?user_id=359
server.get('/rest-api/group_mappings', async (req, res) => {
    try {
    const { user_id } = req.query;
    var ugms;
    switch (dataSource) {
        case "postgresql":
            ugms = await postgresqlGetAllUserGroupMappings(user_id);
            break;
        case "json":
            console.log("Not Implemented");
            break;
    }
    res.json(ugms);
    console.log("get /rest-api/users [GetAllUserGroupMappings] was called " + ++counter + " times\npayload:" + ugms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// POST: Create User Group Mappings
// curl example:
// curl -X POST -H "Content-Type: application/json" -d "{\"user_id\": \"359\", \"group_id\": \"20\"}" http://localhost:8081/rest-api/group_mappings
server.post('/rest-api/group_mappings', async (req, res) => {
    try {
    const { user_id, group_id } = req.body;
    var ugm;
    switch (dataSource) {
        case "postgresql":
            ugm = await postgresqlCreateUserGroupMappings(user_id, group_id);
            break;
        case "json":
            console.log("Not Implemented");
            break;
    }
    res.json(ugm);
    console.log("post /rest-api/group_mappings [CreateUserGroupMappings]" + ugm + " was called " + ++counter);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

// DELETE: Delete existing User Group Mappings
// curl example:
// curl -X DELETE http://localhost:8081/rest-api/group_mappings/359?group_id=20 
// or
// curl -X DELETE http://localhost:8081/rest-api/group_mappings/359
server.delete('/rest-api/group_mappings/:user_id', async (req, res) => {
    try {
    const { user_id } = req.params;
    const { group_id } = req.query;
    switch (dataSource) {
        case "postgresql":
            await postgresqlDeleteExistingUserGroupMappings(user_id, group_id);
            break;
        case "json":
            console.log("Not Implemented");
            break;
    }
    res.json({ message: `DeleteExistingUserGroupMappings user_id ${user_id} group_id ${group_id} has been deleted` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});
/*********************************/
/****** User Group Mappings ******/
/*********************************/

/**************************************/
/****** User Group Role Mappings ******/
/**************************************/
// GET: Get all User Group Role Mappings
// curl -X GET -H "Content-Type: application/json" -d "" http://localhost:8081/rest-api/group_role_mappings
// or 
// curl -X GET -H "Content-Type: application/json" -d "" http://localhost:8081/rest-api/group_role_mappings?group_id=20
server.get('/rest-api/group_role_mappings', async (req, res) => {
    try {
    const { group_id } = req.query;
    var grms;
    switch (dataSource) {
        case "postgresql":
            grms = await postgresqlGetAllUserGroupRoleMappings(group_id);
            break;
        case "json":
            console.log("Not Implemented");
            break;
    }
    res.json(grms);
    console.log("get /rest-api/users [GetAllUserGroupRoleMappings] was called " + ++counter + " times\npayload:" + grms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message }); 
    }
});

// POST: Create User Group Role Mappings
// curl example:
// curl -X POST -H "Content-Type: application/json" -d "{\"group_id\": \"20\", \"role_id\": \"14\"}" http://localhost:8081/rest-api/group_role_mappings
server.post('/rest-api/group_role_mappings', async (req, res) => {
    try {
    const { group_id, role_id } = req.body;
    var grm;
    switch (dataSource) {
        case "postgresql":
            grm = await postgresqlCreateGroupRoleMappings(group_id, role_id);
            break;
        case "json":
            console.log("Not Implemented");
            break;
    }
    res.json(grm);
    console.log("post /rest-api/group_role_mappings [CreateGroupRoleMappings]" + grm + " was called " + ++counter);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message }); 
    }
});

// DELETE: Delete existing User Group Role Mappings
// curl example:
// curl -X DELETE http://localhost:8081/rest-api/group_role_mappings/20?role_id=14
// or
// curl -X DELETE http://localhost:8081/rest-api/group_role_mappings/20
server.delete('/rest-api/group_role_mappings/:group_id', async (req, res) => {
    try {
    const { group_id } = req.params;
    const { role_id } = req.query;
    switch (dataSource) {
        case "postgresql":
            await postgresqlDeleteExistingGroupRoleMappings(group_id, role_id);
            break;
        case "json":
            console.log("Not Implemented");
            break;
    }
    res.json({ message: `DeleteExistingGroupRoleMappings group_id ${group_id} role_id ${role_id} has been deleted` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message }); 
    }
});
/**************************************/
/****** User Group Role Mappings ******/
/**************************************/

switch (dataSource) {
    case "postgresql":
        server.listen(PORT, () => console.log(`${packageJson.name} version ${packageJson.version} listening on port ${PORT} with postgresql data source`));
        break;
    case "json":
        server.listen(PORT, () => console.log(`${packageJson.name} version ${packageJson.version} listening on port ${PORT} with json data source`));
        break;
}

