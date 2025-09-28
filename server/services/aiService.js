// server/services/aiService.js
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const analyzeResume = async (resumeText) => {
  const prompt = `
    You are an expert career coach and professional resume reviewer. Your task is to analyze the following resume text and provide constructive feedback.

    Analyze the resume based on the following criteria:
    1.  **Clarity and Conciseness:** Is the language clear, professional, and to the point?
    2.  **Impact and Action Verbs:** Does the candidate use strong action verbs to describe their accomplishments?
    3.  **Keyword Optimization:** Does the resume seem optimized for Applicant Tracking Systems (ATS) with relevant keywords for common job roles (like software engineering, project management, etc.)?

    Based on your analysis, provide the following output in a structured JSON format. Do not include any text or markdown formatting before or after the JSON object.

    The JSON object should have these exact keys:
    - "overallScore": A numerical score from 0 to 100 representing the resume's overall quality.
    - "summary": A brief, one or two-sentence summary of the resume's strengths and key areas for improvement.
    - "keywordGaps": An array of 5-7 suggested keywords the user might be missing.
    - "improvements": An array of objects, where each object has a "before" key with a direct quote from the resume and an "after" key with your suggested improvement. Provide 3-4 specific improvement suggestions.

    Here is the resume text:
    ---
    ${resumeText}
    ---
  `;

  try {
    const response = await groq.chat.completions.create({
      // A powerful and fast open-source model
      model: 'openai/gpt-oss-20b',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
    });

    const responseText = response.choices[0].message.content;
    return JSON.parse(responseText);
  } catch (error) {
    console.error('Error analyzing resume with Groq:', error);
    throw new Error('Failed to get analysis from AI service.');
  }
};
