# Assignment 15

### Add a new column to roles table - permissions. It will be array of strings. Implement authorisation as a component in loopback application.Push the code to the repo on github. Generate a PR for review.Use the starter project as reference on how it can be done.

<br />


## concepts/Libraries used

* Angular UI
* Tailwind css for styling
* ES6 concpets
* loopback for backend api
* postgres-sql as datasorce
* SOLID principles implemented
* jwt-authentication with ngx-cookie
* role based authorization

## routes

### /login

![Alt text](./5.png?raw=true "Title")

### /users

![Alt text](./1.png?raw=true "Title")

### /customers

![Alt text](./2.png?raw=true "Title")

### /customers/:id/users

![Alt text](./3.png?raw=true "Title")

### /createcustomer /createuser

![Alt text](./4.png?raw=true "Title")

## authorization roles

there are primarily 4 authorization roles

### general 
this is a default role given to every user which allows user to acces all the non auth routes like login and register

### generalAuth
this is the role which allows users to
* view all users
* edit users

### advancedAuth
this role allows users to
* everything from generalAuth
* view all customers
* add customers
* add user for customers
* edit customers

### completeAuth
this role allows users to
* do everything from general and advancedAuth
* delete users

## Setup

now before u run the app 

* create a postgres db and plug its details in /lb4-server/datasources/postgre-db.datasource.ts

* start the server by npm start inside lb4-server
* go to http://localhost:3000/explorer/#/RoleController/RoleController.create

* one by one create 3 roles with the following body
```
{
  "name": "SUPER_ADMIN",
  "permissions": [
    "generalAUth",
    "advancedAuth",
    "completeAuth
  ]
}
```
```
{
  "name": "ADMIN",
  "permissions": [
    "generalAUth",
    "advancedAuth",
  ]
}
```
```
{
  "name": "SUBSCRIBER",
  "permissions": [
    "generalAUth"
  ]
}
```
so now based on the following setup , we will have 3 roles SUBSCRIBER, ADMIN and SUPER_ADMIN with SUBCRIBER having the lowest priveleges and SUPERADMIN having the highest.

## How to run

server : 
* cd lb4-server
* npm start
<br />

client : 
* cd angular-client
* npm start

## Working

* go to http://localhost:4200/register and create a user
* now go to http://localhost:4200/login and login with the user created
* initially a newly created user will be assigned the role having key 1 (SUPER_ADMIN) but you can edit the roles and user info.
* now you can create customers, add users to them, login through the users you created and edit everything.( based on your role )
* a non logged in user will be redirect to the login page if he/she tries to acces the protected routes
* a non authenticated user wont be able to access restricted ap endpoints as well. ex: if a subscriber tries to access /cutosmers he will see an empty list.





<br />
<br />
<br />


