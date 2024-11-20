
# Typescript To-do Management system

This is a fullstack project made with `Typescript` that allows users to generate and manage tasks.

![](https://emerald-negative-hawk-579.mypinata.cloud/ipfs/QmQ9qBPukigcj8QdcPLFjdTdja3tTEhjuA6uFUCjJhPNH3)

## Features

- Fullstack Task Management System.
- Includes Frontend with React + Typescript.
- Includes Backend with Nodejs + Typescript.
- Database with MySQL

![](https://emerald-negative-hawk-579.mypinata.cloud/ipfs/QmNm7TLRYZSNcj3CDP4CnSgdZpXy2JnZ5BkW7cfw5yJcs9)
## Installation

After downloading the project you will need to access the `./frontend` and `./backend` folders and execute `npm install`

### Environment Variables

In the root of the `./backend` folder create a `.env` file with the following variables. They are mandatory for the project to run properly.

```bash
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
JWT_SECRET=
```

In the root of the `./frontend` folder create another with the following variable. This will let the system know where is running the backend.

```bash
REACT_APP_API_BASE_URL =  
```

### Running the Backend
After setting up the environment variables, go to the `./backend` folder and execute the following command lines.
```bash
$ npx tsc
$ node ./dist/index.js
```

### Running the frontend
After setting up the environment variables, go to the `./frontend` folder and execute the following command lines.

```bash
$ npm start
```
 
 
