//  npm init -y, npm i express, npm i ejs : ya module , lock and packeg all three install kr dega 

import express from 'express';  // Express framework ko import karna
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI("AIzaSyBPyu55cgjsin65qmNzduhNtNGS1t536TY");
const app = express();              //  server banana  hai that is why  isko import kiya gaya hai 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('view engine', 'ejs');    // iska explanation necha likha hai 
app.set('views', path.join(__dirname, 'views')); //  (EJS files) views folder ke andar hongi.
app.use(express.static(path.join(__dirname, 'public')));  // css ka liya 



// post request seh aaya hua data ko read krna ka liya we use this middle malwere. 
app.use(express.urlencoded({extended:true})); 



app.get("/templet", (req, res)=>{  
  res.render("index.ejs", { 
      marks: null, 
      spellingMistakes: null, 
      grammarMistakes: null 
  });
});


app.post('/content', async(req, res) => { // Route 1: form ka request ko receive karega 
      // const prompt = req.body.prompt;
    const prompt = `      
      ⚠️ Strictly use this exact format for output:
      
      * Marks: x/20  
      * Spelling Mistakes (write incorrect word and correct version):  
        > wrong → right  
      * Grammar Mistakes (mention incorrect sentence/phrase and correct version):  
        > wrong → right  

      Here is the student’s answer:
      ${req.body.prompt}   
      `;
      // req.body.prompt form se aayi user ki input hai (matlab student ka answer).
    
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text(); // (Matlab jo plain answer AI ne likha — woh string form me nikaal kar text variable me store ho gaya.)

        const marksMatch = text.match(/\* Marks:\s*(.*)/);
        const spellingMatch = text.match(/\* Spelling Mistakes:\s*([\s\S]*?)\* Grammar Mistakes:/);
        const grammarMatch = text.match(/\* Grammar Mistakes:\s*([\s\S]*)/);


        


        const marks = marksMatch ? marksMatch[1].trim() : "Not found";
        const spelling = spellingMatch ? spellingMatch[1].trim() : "No spelling mistakes";
        const grammar = grammarMatch ? grammarMatch[1].trim() : "No grammar mistakes";


        res.render('index', {
          marks: marks,
          spellingMistakes: spelling,
          grammarMistakes: grammar
        });


      } catch (error) {
        console.error(error);
        // res.render('index', { answer: "Something went wrong!" });
        res.render('index', { 
          marks: "N/A", 
          spellingMistakes: "N/A", 
          grammarMistakes: "N/A" 
        });
      }
    // res.redirect("/templet")   templet per redirect krna hai q ki wohi hamara form hai
});




// . get- Jab user server se kuch maangta hai .
app.get("/", (req, res)=>{
    res.send("root is working");
});

app.listen(8080, ()=>{
    console.log("server is listening on port 8080");
});

/*
app.set('view engine', 'ejs'); ka matlab hai:

Jab bhi aap res.render() ka use karenge, tab Express ko view engine ke through automatically pata chalega ki:

File ka extension .ejs hoga.

Aur is file ko process karne ke liye EJS view engine ka use kiya jayega, jo template ko dynamic HTML mein convert karega.
*/

