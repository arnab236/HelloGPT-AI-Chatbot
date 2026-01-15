import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = "Your API Key";
const genAI = new GoogleGenerativeAI(API_KEY);

export async function getChatResponse(message: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const prompt = `
      You are a helpful AI assistant.
      Respond clearly, concisely, and stay on topic.
      If the question is ambiguous, ask for clarification.

      User message:
      ${message}
      `;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting chat response:', error);
    return 'Sorry, I encountered an error. Please try again.';
  }
}
