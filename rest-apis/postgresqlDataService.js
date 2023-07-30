"use strict";

// postgresqlDataService.js
const { PrismaClient } = require('@prisma/client');
const config = require('./config.js');

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: config.dburl,
        },
    },
});

/****** USERS ******/
async function postgresqlGetAllUsers() {
    const users = await prisma.users.findMany({
        orderBy: {
            id: 'asc', // or 'desc'
        },
    });
    return users;
}

async function postgresqlGetUsersById(id) {
    const user = await prisma.users.findUnique({
        where: { id: Number(id) }
    });
    return user;
}

async function postgresqlCreateNewUser(username, email, password) {
    const user = await prisma.users.create({
        data: { username, email, password }
    });
    return user;
}

async function postgresqlUpdateExistingUser(id, username, email, password) {
    const user = await prisma.users.update({
        where: { id: Number(id) },
        data: { username, email, password }
    });
    return user;
}

async function postgresqlDeleteExistingUser(id) {
    await prisma.users.delete({
        where: { id: Number(id) }
    });
}
/****** USERS ******/

/****** User Groups ******/
async function postgresqlGetAllGroups() {
    const groups = await prisma.user_groups.findMany({
        orderBy: {
            id: 'asc', // or 'desc'
        },
    });
    return groups;
}

async function postgresqlGetGroupsById(id) {
    const group = await prisma.user_groups.findUnique({
        where: { id: Number(id) }
    });
    return group;
}

async function postgresqlCreateNewGroup(name) {
    const group = await prisma.user_groups.create({
        data: { name }
    });
    return group;
}

async function postgresqlUpdateExistingGroup(id, name) {
    const group = await prisma.user_groups.update({
        where: { id: Number(id) },
        data: { name }
    });
    return group;
}

async function postgresqlDeleteExistingGroup(id) {
    await prisma.user_groups.delete({
        where: { id: Number(id) }
    });
}
/****** User Groups ******/

/****** User Roles ******/
async function postgresqlGetAllRoles() {
    const roles = await prisma.user_roles.findMany({
        orderBy: {
            id: 'asc', // or 'desc'
        },
    });
    return roles;
}

async function postgresqlGetRolesById(id) {
    const role = await prisma.user_roles.findUnique({
        where: { id: Number(id) }
    });
    return role;
}

async function postgresqlCreateNewRole(name) {
    const role = await prisma.user_roles.create({
        data: { name }
    });
    return role;
}

async function postgresqlUpdateExistingRole(id, name) {
    const role = await prisma.user_roles.update({
        where: { id: Number(id) },
        data: { name }
    });
    return role;
}

async function postgresqlDeleteExistingRole(id) {
    await prisma.user_roles.delete({
        where: { id: Number(id) }
    });
}
/****** User Roles ******/

/****** User Group Mappings ******/
//if user_id is Nothing, return all records
async function postgresqlGetAllUserGroupMappings(user_id) {
    var ugms;
    if (user_id == null) {
        ugms = await prisma.user_group_mappings.findMany({
            orderBy: {
                user_id: 'asc', // or 'desc'
            },
        });
    } else {
        ugms = await prisma.user_group_mappings.findMany({
            where: {
                user_id: Number(user_id)
            },
            orderBy: {
                user_id: 'asc', // or 'desc'
            },
        });
    }
    return ugms;
}

async function postgresqlCreateUserGroupMappings(user_id, group_id) {
    const parsedUserId = parseInt(user_id, 10);
    const parsedGroupId = parseInt(group_id, 10);

    const ugm = await prisma.user_group_mappings.create({
        data: {
            user_groups: {
                connect: { id: parsedGroupId },
            },
            users: {
                connect: { id: parsedUserId },
            },
        },
    });

    return ugm;
}

// postgresqlDeleteExistingUserGroupMappings(user_id, group_id) deletes a record by user_id and
// group_id, omitting group_id (group_id is Nothing) deletes records with the corresponding user_id.
async function postgresqlDeleteExistingUserGroupMappings(user_id, group_id) {
    if (group_id == null) {
        await prisma.user_group_mappings.deleteMany({
            where: { user_id: Number(user_id) }
        });
    } else {
        await prisma.user_group_mappings.deleteMany({
            where: { user_id: Number(user_id), group_id: Number(group_id) }
        });
    }
}
/****** User Group Mappings ******/

/****** User Group Role Mappings ******/
//if group_id is Nothing, return all records
async function postgresqlGetAllUserGroupRoleMappings(group_id) {
    var ugrms;
    if (group_id == null) {
        ugrms = await prisma.user_group_role_mappings.findMany({
            orderBy: {
                group_id: 'asc', // or 'desc'
            },
        });
    } else {
        ugrms = await prisma.user_group_role_mappings.findMany({
            where: {
                group_id: Number(group_id)
            },
            orderBy: {
                group_id: 'asc', // or 'desc'
            },
        });
    }
    return ugrms;
}

async function postgresqlCreateGroupRoleMappings(group_id, role_id) {
    const parsedGroupId = parseInt(group_id, 10);
    const parsedRoleId = parseInt(role_id, 10);

    const ugm = await prisma.user_group_role_mappings.create({
        data: {
            user_groups: {
                connect: { id: parsedGroupId },
            },
            user_roles: {
                connect: { id: parsedRoleId },
            },
        },
    });

    return ugm;
}

// postgresqlDeleteExistingGroupRoleMappings(group_id, role_id) deletes a record by group_id and
// role_id, omitting role_id (role_id is Nothing) deletes records with the corresponding group_id.
async function postgresqlDeleteExistingGroupRoleMappings(group_id, role_id) {
    if (role_id == null) {
        await prisma.user_group_role_mappings.deleteMany({
            where: { user_id: Number(group_idgroup_id) }
        });
        return;
    }
    await prisma.user_group_role_mappings.deleteMany({
        where: { group_id: Number(group_id), role_id: Number(role_id) }
    });
}
/****** User Group Role Mappings ******/


module.exports = {
    postgresqlGetAllUsers,
    postgresqlGetUsersById,
    postgresqlCreateNewUser,
    postgresqlUpdateExistingUser,
    postgresqlDeleteExistingUser,

    postgresqlGetAllGroups,
    postgresqlGetGroupsById,
    postgresqlCreateNewGroup,
    postgresqlUpdateExistingGroup,
    postgresqlDeleteExistingGroup,

    postgresqlGetAllRoles,
    postgresqlGetRolesById,
    postgresqlCreateNewRole,
    postgresqlUpdateExistingRole,
    postgresqlDeleteExistingRole,

    postgresqlGetAllUserGroupMappings,
    postgresqlCreateUserGroupMappings,
    postgresqlDeleteExistingUserGroupMappings,

    postgresqlGetAllUserGroupRoleMappings,
    postgresqlCreateGroupRoleMappings,
    postgresqlDeleteExistingGroupRoleMappings
};