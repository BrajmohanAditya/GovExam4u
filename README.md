* make a folder in vs code and perform the following operation for basic setup 
> npm init -y (it will create package.json)
> npm i express (it will create node_module)
> npm ejs
> npm i mongoose
> Now create app.js folder 
  -------------       DATA   BASE    OPERATION ----------------

  /*  SQL notes (init folder meh jo data hai ushper ya operation hoga)
> nmongosh (switch to mongodb in cmd)
> show dbs (sara data base show karega)
> use whatsapp
> db.dropDatabase() , Sql query fro droping db
> wonderlust> db.listings.find(), db ka ander jo listingfile hai usko nikal k dega 
> wonderlust> db.reviews.find()
> wonderlust> db.listings.find({title: "opoppp"})
> app.get: request receive krta hai and kuch serve krta hai, like koi file. 
> wonderlust> show collections
*/

------------- .get()   .post()   .put()    .delet()   .use()   .listen()  .all()  ------------------

> .get() :  is use to give response to  the request which comes from browser.

> .post():    is use to receive  request which comes from browser. like we submit a form. 

> app.use():  ek middleware ko attach karta hai, jo request-response ke beech me kaam karta hai (jaise logging,      authentication, body parsing, routes handle karna, etc.).

> CORS() is a middleware in Express that specifies which frontend origins (domains or URLs) are permitted to communicate with the backend server.




# RESTful API = A standard way for client and server to communicate using  HTTP methods.

# Nodejs provide runtime environment to javascript

--------------------------  Aim: signUp Login, Logout --------------------------------
# How to render a form ? 
>Q: jb frontend seh signUp ya Login form per call aya toh usko render karo. 

process: Make a folder "users" , inside "users" make 3 files "login.jsx" and "signup.jsx" and "usersRoute.jsx" create routes for login.jsx and signUp.jsx in "usersRoute.jsx" which contains "/paths" of every route yahi path ko hum frontend k button seh link krta hai. now put "usersRoute.jsx" in "AppRoutes.jsx" for final rendering.
The moment you submit the form make a route in "app.js" to receive that data and save in data base. 





# what are hooks in react  ?
ans: Hooks are functions introduced in React 16.8 that let functional components use state and lifecycle features.
useState, useEffect, useContext. 

import { useState } from "react";
function Counter() {
  const [count, setCount] = useState(0); // hook use kiya

  return (
    <div>
      <p>Value: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}

import { useEffect } from "react";

useEffect(() => {
  console.log("Component mounted");
}, []);  // [] means only once run hoga

----------------------------------------------------------------------------------------------------------------
# CORS(Cross-Origin Resource Sharing) ?
> It’s like giving permission for which frontends are allowed to talk to your backend. we define this in our server file

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://govexam4u-frontend.onrender.com",
      "https://govexam4u.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
); means ya 3 url per backend ko call ayaga frontend seh
-------------------------------------------------------------------------------------------------------------------
# Why we use schema and JOI ? (SERVER side VALIDATION)
> Schema is used to define data types and apply server-side validation before saving data to the database.

> “Joi is used for server-side validation as middleware, so any data from forms or requests is checked before saving to the database, ensuring correctness and security.”


---------------------------------------------------------------------------------
# Login Logout Signup
>aim: if Login show only username (step-17 wonderlust)

>aim : signup  login logout 



# Backend Token test in jwt
$headers = @{
    "Content-Type" = "application/json"
}

$body = @{
    username = "l"
    password = "l"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8080/login" -Method POST -Headers $headers -Body $body
