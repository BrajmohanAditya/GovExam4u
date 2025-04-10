import { GoogleGenerativeAI } from "@google/generative-ai";

// Replace with your actual Gemini API key
const genAI = new GoogleGenerativeAI("AIzaSyA1756YkXQKxHzv5HQqW2LYkpBPvauAjlc");

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const prompt = "Key of sucess.";
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();



