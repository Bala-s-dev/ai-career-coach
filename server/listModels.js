// server/listModels.js
import dotenv from 'dotenv';
dotenv.config();

import { GoogleGenerativeAI } from '@google/generative-ai';

// Make sure your GEMINI_API_KEY is set in your .env file
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function run() {
  console.log('Fetching available models for your API key...');
  try {
    const result = await genAI.listModels();

    console.log('-----------------------------------------------------');
    console.log('--- ✅ Available Models ---');
    for (const model of result.models) {
      // We only care about models that can be used for generating text
      if (model.supportedGenerationMethods.includes('generateContent')) {
        console.log(`Model ID: ${model.name}`);
      }
    }
    console.log('-----------------------------------------------------');
    console.log('\nACTION: Copy one of the Model IDs from the list above.');
    console.log(
      "Then, paste it into your 'aiService.js' file and restart the server."
    );
  } catch (error) {
    console.error('Error fetching models:', error);
  }
}

run();
