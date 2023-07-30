const { postgresqlGetAllUsers, postgresqlGetUsersById, postgresqlCreateNewUser, postgresqlUpdateExistingUser, postgresqlDeleteExistingUser } = require('./postgresqlDataService');
const { jsonGetMaxUserId, jsonGetMinUserId, jsonGetAllUsers, jsonGetUsersById, jsonCreateNewUser, jsonUpdateExistingUser, jsonDeleteExistingUser } = require('./jsonDataService');

const config = require('./config.js');
const packageJson = require('./package.json');

let counter = 0;
let dataSource = config.dataSource;

/****** USERS ******/
// GET: Get all users
async function GetAllUsers(api) {
    var users;
    switch (dataSource) {
        case "postgresql":
            users = await postgresqlGetAllUsers();
            break;
        case "json":
            users = await jsonGetAllUsers();
            break;
    }
    console.log("get " + api + " [GetAllUsers] was called " + ++counter + " times\npayload:" + users);
    return (users);
};

// GET: Get an individual user by ID
async function GetUsersById(api, id) {
    var user;
    switch (dataSource) {
        case "postgresql":
            user = await postgresqlGetUsersById(id);
            break;
        case "json":
            user = await jsonGetUsersById(id);
            break;
    }
    console.log("get " + api + " [GetAllUsers] was called " + id + " was called " + ++counter + " times\npayload:" + user);
    return (user);
};

// POST: Create new user
async function CreateNewUser(api, username, email, password) {
    switch (dataSource) {
        case "postgresql":
            await postgresqlCreateNewUser(username, email, password);
            break;
        case "json":
            await jsonCreateNewUser(username, email, password);
            break;
    }
    console.log("get " + api + " [GetAllUsers] was called " + username + " " + email + " was called " + ++counter);
};

// PUT: Update existing user
async function UpdateExistingUser(api, id, username, email, password) {
    switch (dataSource) {
        case "postgresql":
            await postgresqlUpdateExistingUser(id, username, email, password);
            break;
        case "json":
            await jsonUpdateExistingUser(id, username, email, password);
            break;
    }
    console.log("get " + api + " [GetAllUsers] was called " + id + " " + username + " " + email + " was called " + ++counter);
};

// DELETE: Delete existing user
async function DeleteExistingUser(api, id) {
    switch (dataSource) {
        case "postgresql":
            await postgresqlDeleteExistingUser(id);
            break;
        case "json":
            await jsonDeleteExistingUser(id);
            break;
    }
    return ({ message: `delete ${api} user ${id} has been deleted` });
};
/****** USERS ******/

// generateRandomUserData
function generateRandomUserData() {
    const firstNames = ['Max', 'Maria', 'Peter', 'Anna', 'John', 'Jane', 'David', 'Emma', 'Sophie', 'Luke'];
    const lastNames = ['Mustermann', 'Musterfrau', 'Parker', 'Smith', 'Doe', 'Brown', 'Garcia', 'Lee', 'Taylor'];
    const domains = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com', 'aol.com', 'protonmail.com'];
    const passwordLength = 8;
    const id = jsonGetMaxUserId() + 1;
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domains[Math.floor(Math.random() * domains.length)]}`;
    const password = Math.random().toString(36).substring(2, 2 + passwordLength);
    return {
        id,
        name: `${firstName} ${lastName}`,
        email,
        password,
    };
}

async function main() {
    switch (dataSource) {
        case "postgresql":
            console.log(`testServer.js version ${packageJson.version} Start with postgresql data source`);
            break;
        case "json":
            console.log(`testServer.js version ${packageJson.version} Start with json data source`);
            break;
    }

    // Build a for loop to create 10 users using the generateRandomUserData function
    /*****
    for (let i = 0; i < 10; i++) {
        var newUser = generateRandomUserData();
        await CreateNewUser("/rest-api/users", newUser.name, newUser.email, newUser.password);
    }
    *****/

    const allUsers = await GetAllUsers("/rest-api/users");
    console.log(allUsers);

    //const user = await GetUsersById("/rest-api/users", 6);
    //console.log(user);

    //await UpdateExistingUser("/rest-api/users",7,"update","update@update","update");

    //const message = await DeleteExistingUser("/rest-api/users", jsonGetMinUserId());
    //console.log(message);

    console.log("testServer.js End.");
}

main();