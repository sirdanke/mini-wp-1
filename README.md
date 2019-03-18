# mini-wp



List of routes:

|   Route               | HTTP  |   Header(s) |Body    | Description

|---------------        |:------    |:---------|:-------|:-----------

|/postings               |POST       | required | author : user:id (**Required**), title:String (**Required**),posting:String (**Required**), tags:String(**required**) , image : imagefile (**required**), category (**required**) | create new posting

|/postings               |GET        | required | none   | get all posting | user only

|/postings/:id           |PATCH      | required | none   | update posting | user only

|/postings/:id           |DELETE     | required | none   | delete posting | user only


|/users                 |POST       | none      | name :String  (**Required**), email:String (**Required**), password: string (**Required**)   | create user

|/login                 |POST       | none      | email:String (**Required**), password: string (**Required**)     | user login

|/login/google          |POS        | none      | goole id_token (**requred**)  |  login/signup google


# Usage

Make sure you have Node.js and npm installed in your computer, and then run these commands:

$ npm install <br/>

$ npm start <br/>

$ npm run dev
