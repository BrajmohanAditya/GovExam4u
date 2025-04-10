// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI("AIzaSyA1756YkXQKxHzv5HQqW2LYkpBPvauAjlc");

// async function run() {
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

//   const prompt = "Key of sucess.";
//   const result = await model.generateContent(prompt);
//   const response = await result.response;
//   const text = response.text();
//   console.log(text);
// }

// run();
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyA1756YkXQKxHzv5HQqW2LYkpBPvauAjlc");

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

// GET: Show form
app.get('/', (req, res) => {
  res.render('index', { answer: null });
});

// POST: Process form
app.post('/generate', async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    res.render('index', { answer: text });
  } catch (error) {
    console.error(error);
    res.render('index', { answer: "Something went wrong!" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
