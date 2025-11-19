- make a folder in vs code and perform the following operation for basic setup

  > npm init -y (it will create package.json)
  > npm i express (it will create node_module)
  > npm ejs
  > npm i mongoose
  > Now create app.js folder
  > ------------- DATA BASE OPERATION ----------------

  /\* SQL notes (init folder meh jo data hai ushper ya operation hoga)

  > nmongosh (switch to mongodb in cmd)
  > show dbs (sara data base show karega)
  > use whatsapp
  > db.dropDatabase() , Sql query fro droping db
  > wonderlust> db.listings.find(), db ka ander jo listingfile hai usko nikal k dega
  > wonderlust> db.reviews.find()
  > wonderlust> db.listings.find({title: "opoppp"})
  > app.get: request receive krta hai and kuch serve krta hai, like koi file.
  > wonderlust> show collections
  > \*/

------------- .get() .post() .put() .delet() .use() .listen() .all() ------------------

> .get() : is use to give response to the request which comes from browser.

> .post(): is use to receive request which comes from browser. like we submit a form.

> app.use(): ek middleware ko attach karta hai, jo request-response ke beech me kaam karta hai (jaise logging, authentication, body parsing, routes handle karna, etc.).

> CORS() is a middleware in Express that specifies which frontend origins (domains or URLs) are permitted to communicate with the backend server.

# RESTful API = A standard way for client and server to communicate using HTTP methods.

# Nodejs provide runtime environment to javascript

-------------------------- Aim: signUp Login, Logout --------------------------------

# How to render a form ?

> Q: jb frontend seh signUp ya Login form per call aya toh usko render karo.

process: Make a folder "users" , inside "users" make 3 files "login.jsx" and "signup.jsx" and "usersRoute.jsx" create routes for login.jsx and signUp.jsx in "usersRoute.jsx" which contains "/paths" of every route yahi path ko hum frontend k button seh link krta hai. now put "usersRoute.jsx" in "AppRoutes.jsx" for final rendering.
The moment you submit the form make a route in "app.js" to receive that data and save in data base.

# what are hooks in react ?

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
}, []); // [] means only once run hoga

---

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

---

# Why we use schema and JOI ? (SERVER side VALIDATION)

> Schema is used to define data types and apply server-side validation before saving data to the database.

> “Joi is used for server-side validation as middleware, so any data from forms or requests is checked before saving to the database, ensuring correctness and security.”

---

# Add exam complete flow

🧍 User clicks Submit
↓
🧠 handleSubmit() (frontend)
↓
📡 Axios POST → http://localhost:8080/examTrack
↓
🧩 Express app.js → app.use("/examTrack", examTrackRoute)
↓
📜 examTrackRoute.js → router.post("/")
↓
🧱 Middleware: validateExamDate()
↓
💾 Controller: Save exam in MongoDB
↓
✅ Response: { message: "Exam added successfully!" }
↓
💬 Frontend alert() + navigate("/examTracker")

# Login Logout Signup

> Login using email and password.
> {

2.  now put email and password in form and click login button which is inside "login.jsx"(frontend),
    }
    (1) User fills form & clicks Register
    ↓
    (2) Frontend builds request → apis.js se URL leke
    ↓
    (3) httpAction() → fetch() call → backend ko HTTP request
    ↓
    (4) Express app.js → /users → routes/user.js
    ↓
    (5) route '/register' → controller registerUser.js
    ↓
    (6) Controller → database operation (save user)
    ↓
    (7) Backend sends JSON response
    ↓
    (8) httpAction() parse response → return to React
    ↓
    (9) React toast + redirect to login page

# How to import file .

backend/
├── controllers/
│ └── user/
│ └── forgotPassword.js ← 🧠 tu yahi file likh raha hai
├── models/
│ └── user.js ← ⚙️ yaha se import karna hai

import User from "../../models/user.js"; user seh baher nikloga toh controllers and controllers seh baher
nikloga toh root folder backend meh aa gaya it means you take 2 jump to come in root folder. so use double slash.

# How to do google authentication

step-1️⃣

User “Signup” button click karta hai → Register.jsx render hota hai. Fir jab user “Continue with Google” button click karta hai, toh window.open("https://api.govexam4u.com/auth/google", "\_self") execute hota hai which is inside register.jsx. Yeh frontend se ek GET request bhejta hai "app.js" ko.
GET /auth/google
Host: api.govexam4u.com
Origin: https://govexam4u.com , CORS check karega or fir allow kr dega.

step-2️⃣
Session, cookieParser, passport.initialize i mean sara middleware bari bari seh chalaga but jo middleware nahi hai wo nahi chalaga like passport.use

step-3️⃣
app.get("/auth/google",); Ye route Passport.js ke through Google OAuth process shuru karta hai. Isme likha hai passport.authenticate("google", { scope: ["profile", "email"] }), jo Google se bolta hai — “mujhe user ka profile aur email access karna hai.” Fir Passport user ko seedha Google ke login page (accounts.google.com) pe redirect kar deta hai, jahan user apna email select krta hai.

step- 4️⃣
Jab user Google ke login page par apna email choose karta hai aur Google uski identity verify kar leta hai ki haa ya ak valid email registered hai google cloud meh, tab Google user ko callback route (/auth/google/callback) pe data bhej deta hai.
passport.use(
new GoogleStrategy(
{
clientID: process.env.GOOGLE_CLIENT_ID,
clientSecret: process.env.GOOGLE_CLIENT_SECRET,
callbackURL: "https://api.govexam4u.com/auth/google/callback",
},
(accessToken, refreshToken, profile, done) => {
return done(null, profile);
}
)
); ya data ko receive krta hai. Ishmeh Google ek temporary code bhejta hai jisse passport.use() Google se user ka full profile data (name, email, photo) le sakta hai.

step- 5️⃣
Tera app.get("/auth/google/callback",) us data ko verify karta hai, agar user pehli baar login kar raha hai to database me save karta hai, warna existing user ko fetch karta hai. Fir backend ek JWT token ya session cookie bana ke user ke browser me store karta hai, taki wo login rahe. Last me backend user ko redirect karta hai frontend par (jaise https://govexam4u.com/), jahan user already logged-in state me pahunchta hai. ✅

# How to do Google Auto login

step-1️⃣
The momennt you open your Browser. "Nvbar.jsx" k ander, 🌐 GET https://api.govexam4u.com/users/verify route calls app.js.

step-2️⃣
app.js catches that prefix "/users" . In your "app.js" , you have this line:
app.use("/users", userRoutes); So Express checks: “Oh, the request URL starts with /users?
Then forward it to the "userRoutes" router (file: routes/user.js).” router.get("/verify", verifyUser); ya route call ko "../controllers/user/verifyUser.js"; file meh transfer kr deta hai. or const verifyUser = async (req, res) => {}; use ko login kra deta hai

# How to make Frontend route protected.
it means only logged in user could access my content.

Make a file "protectedRoute.jsx" and import it in any route file ex: "examTrackRoute.jsx" and write route like this
<ProtectedRoute>
<ExamTrack />
</ProtectedRoute>


# How to signup User using email, password and user name.

1. Navbar.jsx meh Signup button meh "onClick={() => navigate("/register")}" path hai, the movement you hit that button it will trigger "/login" route of "userRoute.jsx" and it will render a signup form (signup.jsx). 

2. 
When we click the Register button inside Signup.jsx, the submitHandler = async (values) executes.
Inside this handler, the data object stores the URL and the form values.
This data is passed into httpAction(data), which sends an API request to the backend.

The API request first reaches app.js,
then app.js forwards it to user.js (the route file),
and "user.js" sends that request to register.js,
where the new user is actually created and saved in MongoDB.

After successful registration, register.js returns a JSON response with a success message,
and the frontend receives this response and shows a toast + redirects to login.