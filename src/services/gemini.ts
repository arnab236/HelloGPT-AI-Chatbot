import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY="YOUR_API_KEY";
const genAI = new GoogleGenerativeAI(API_KEY);

export async function getChatResponse(message: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting chat response:', error);
    return 'Sorry, I encountered an error. Please try again.';
  }
}
