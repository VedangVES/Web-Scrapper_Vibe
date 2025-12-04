import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function analyzeContent(prompt: string, content: string) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return "Gemini API Key is missing.";
    }
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent([prompt, content]);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error analyzing content:", error);
    return "Failed to analyze content with Gemini AI.";
  }
}
