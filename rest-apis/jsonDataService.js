"use strict";

// jsonDataService.js
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

function jsonGetMaxUserId() {
  let maxId = 0;
  let users = [];

  try {
    users = JSON.parse(fs.readFileSync('users.json'));
  } catch (err) {
    if (err.code === 'ENOENT') {
      // If the file doesn't exist, create an empty list of users
      fs.writeFileSync('users.json', JSON.stringify(users));
    } else {
      throw err;
    }
  }

  if (users.length > 0) {
    maxId = Math.max(...users.map(user => user.id));
  }

  return maxId;
}

function jsonGetMinUserId() {
  let minId = 0;
  let users = [];

  try {
    users = JSON.parse(fs.readFileSync('users.json'));
  } catch (err) {
    if (err.code === 'ENOENT') {
      // If the file does not exist, returns 0
      return minId;
    } else {
      throw err;
    }
  }

  if (users.length > 0) {
    minId = Math.min(...users.map(user => user.id));
  }

  return minId;
}

async function jsonGetAllUsers() {
  try {
    const users = JSON.parse(fs.readFileSync('users.json'));
    return users;
  } catch (err) {
    if (err.code === 'ENOENT') {
      // If the file doesn't exist, return an empty array
      return [];
    } else {
      throw err;
    }
  }
}

async function jsonGetUsersById(id) {
  try {
    const users = JSON.parse(fs.readFileSync('users.json'));
    const user = users.find(u => u.id === id);
    return user;
  } catch (err) {
    if (err.code === 'ENOENT') {
      // If the file doesn't exist, return null
      return null;
    } else {
      throw err;
    }
  }
}

async function jsonCreateNewUser(username, email, password) {
  const id = jsonGetMaxUserId() + 1;
  const newUser = { id, username, email, password };
  let users = [];
  try {
    users = JSON.parse(fs.readFileSync('users.json'));
  } catch (err) {
    if (err.code === 'ENOENT') {
      // If the file doesn't exist, create an empty list of users
      users = [];
    } else {
      throw err;
    }
    return newUser;
  }

  users.push(newUser);
  fs.writeFileSync('users.json', JSON.stringify(users));
}

async function jsonUpdateExistingUser(id, username, email, password) {
  let users = [];
  try {
    users = JSON.parse(fs.readFileSync('users.json'));
  } catch (err) {
    if (err.code === 'ENOENT') {
      // If the file does not exist, there are no users to update
      return;
    } else {
      throw err;
    }
  }

  const updatedUsers = users.map(u => {
    if (u.id === id) {
      if (username) {
        u.username = username;
      }
      if (email) {
        u.email = email;
      }
      if (password) {
        u.password = password;
      }
    }
    return u;
  });

  fs.writeFileSync('users.json', JSON.stringify(updatedUsers));
}

async function jsonDeleteExistingUser(id) {
  let users = [];

  try {
    users = JSON.parse(fs.readFileSync('users.json'));
  } catch (err) {
    if (err.code === 'ENOENT') {
      // If the file does not exist, there are no users to delete
      return;
    } else {
      throw err;
    }
  }

  try {
    console.log(id);
    console.log(users);
    const updatedUsers = users.filter(u => u.id !== id);
    console.log(updatedUsers);
    fs.writeFileSync('users.json', JSON.stringify(updatedUsers));
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log("ERROR " + err.code);
      return;
    } else {
      throw err;
    }
  }
}

module.exports = {
  jsonGetMaxUserId,
  jsonGetMinUserId,
  jsonGetAllUsers,
  jsonGetUsersById,
  jsonCreateNewUser,
  jsonUpdateExistingUser,
  jsonDeleteExistingUser
};