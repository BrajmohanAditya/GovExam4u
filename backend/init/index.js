const mongoose = require("mongoose");
const initData = require("./data.js");
const govexam4u = require("../models/exam.js");


// Establishing connection to Data base ---> (Step-3)
const MONGO_URL = "mongodb://127.0.0.1:27017/govexam4u"; 
main().then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
});
async function main(){   
   await mongoose.connect(MONGO_URL);
}
//***


// Inserting Data into Data base  ---> (Step-4)
const initDB = async()=>{
    await govexam4u.deleteMany({});
    await govexam4u.insertMany(initData.data); // line no: 2 dekho
    console.log("data has initialized");
}
initDB();
//***




/*

> command to save data into data base. 
* cd init
* node index.js   

*/