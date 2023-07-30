# build:
# docker build -t uhwgmxorg/my-user-management-with-roles-postgresql-docker-image:0.0.0 .
# start:
# docker run --name my-container -p 8081:8081 -p 5432:5432 -e POSTGRES_USER=dev_user -e POSTGRES_PASSWORD=password -e POSTGRES_DB=mydb -d uhwgmxorg/my-user-management-with-roles-postgresql-docker-image:0.0.0
# Using the official postgres:15 image as a base
FROM postgres:15

# Install necessary packages for Node.js
RUN apt-get update

# Install Node.js 16.19.0
RUN apt-get install -y nodejs npm

# Check the installed versions of Node.js and npm
RUN node -v && npm -v

# Copy the SQL script into the /docker-entrypoint-initdb.d/ directory
COPY init_create_schema_and_table_and_insert_testdata.sql /docker-entrypoint-initdb.d/init_create_schema_and_table_and_insert_testdata.sql

# Copy the other files
WORKDIR /app
COPY package.json ./
COPY schema.prisma ./
COPY config.js ./
COPY jsonDataService.js ./
COPY postgresqlDataService.js ./
COPY server.js ./

# Install the dependencies
RUN npm install
RUN npm install -g prisma
RUN prisma generate

# start the REST Api and the DB
CMD node server.js & /usr/local/bin/docker-entrypoint.sh postgres