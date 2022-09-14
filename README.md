1. If on server do not installing node
use this 
npm install -g npm-windows-upgrade
npm install -g concurrently
2. Nothing, read next
3. Rename the file that is called sample.env to just .env so that the environmental variables will be loaded by the dotenv library. Then complete the env-variables that need to be configured for your local postgres db. The file has the following variables:
```
PORT=5000
DB_USER=
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=auth_starter

SESSION_SECRET=TopSecret
```
Configure DB_USER and DB_PASSWORD for your local postgres connection. If you choose a different name for the database than auth_starter, then change DB_DATABASE to equal the new db name. Change the SESSION_SECRET as well. If you like a long secure string, the following node command can be used from the command line to generate a random string:
```
node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
```
4. Run npm install in the root directory. This installs the back-end express server dependencies.
5. Run npm install in the client/ directory. This installs the front end React project dependencies.
6. The project has concurrently and nodemon as dev-dependencies. Nodemon restarts upon code-changes and concurrently allows easy starting of both server and client with one command. To start both the express server and React development server from the project root directory, type:
```
npm start
```
