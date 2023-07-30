# MyIonicReactUserManagementWithRolesApp
is an Ionic/React app with a web service like [MyIonicReactUserManagementApp.node](https://github.com/uhwgmxorg/MyIonicReactUserManagementApp.node) with the only difference that a user can be assigned one or more group(s) and a group can be assigned one or more role(s).

Essentially, the following concepts are demonstrated:

- Docker
- Ionic/React
- PostgreSQL as a data source with Prisma
- REST web service with Prisma and PostgreSQL
- m to n relations with ON DELETE CASCADE and ON DELETE SET NULL

A PostgreSQL database is used for local data storage (in this case there is no implementation for a backend with storage in a JSON file). The web service is implemented in a Docker container and can be run with the following command if Docker is installed:

`docker run -p 8081:8081 -p 5432:5432 -e POSTGRES_USER=dev_user -e POSTGRES_PASSWORD=password -e POSTGRES_DB=mydb -d uhwgmxorg/my-user-management-with-roles-postgresql-docker-image:0.0.0`

to use the Web-Service with a PostgreSQL DB (Note: in this version there is only one backend with a Postgres DB)

![img](https://github.com/uhwgmxorg/MyIonicReactUserManagementWithRolesApp.node/blob/master/Doc/96_1.png)

The web application can be started with: 

`ionic serve`. 

The node modules must first be installed using: 

`npm install`.

![img](https://github.com/uhwgmxorg/MyIonicReactUserManagementWithRolesApp.node/blob/master/Doc/96_2.png)

You can get more Information on: https://uhwgmxorg.wordpress.com/2023/07/30/myionicreactusermanagementwithrolesapp/
