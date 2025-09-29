// server/services/aiService.js
import Groq from 'groq-sdk';
// ... (groq initialization)
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const generateJobQueryFromResume = async (resumeText) => {
  const prompt = `
    Analyze the following resume text. Based on the skills, job titles, and experience, what is the single most appropriate job title or search query for this person's next job?

    Return ONLY the job title string and nothing else. Do not add quotes, labels, or any explanatory text.

    Examples of good responses:
    - Senior Software Engineer
    - Product Manager
    - Data Analyst
    - Graphic Designer

    Here is the resume text:
    ---
    ${resumeText}
    ---
  `;

  try {
    // NOTE: We are NOT asking for JSON here, just plain text.
    const response = await groq.chat.completions.create({
      model: 'openai/gpt-oss-20b',
      messages: [{ role: 'user', content: prompt }],
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating job query with Groq:', error);
    throw new Error('Failed to generate job query from AI service.');
  }
};

export const analyzeResume = async (resumeText, jobDescription = '') => {
  let prompt;

  // The new, more detailed structure we want for each improvement.
  const improvementJsonStructure = `{
    "category": "A category like 'Impact & Action Verbs', 'Clarity & Conciseness', or 'Skills & Keywords'",
    "priority": "'High', 'Medium', or 'Low'",
    "before": "A direct quote from the resume that needs improvement.",
    "after": "The suggested, improved version of the quote.",
    "rationale": "A brief explanation of why the 'after' version is better."
  }`;

  if (jobDescription) {
    // --- PROMPT 2: TARGETED ANALYSIS (UPGRADED) ---
    prompt = `
      You are an expert HR recruiter... (The initial instructions are the same)
      
      The JSON object must have these exact keys: "matchScore", "summary", "keywordGaps", and "improvements".
      The "improvements" key must be an array of 3-4 objects. EACH object in the array must follow this exact JSON structure:
      ${improvementJsonStructure}

      Here is the RESUME text:
      ---
      ${resumeText}
      ---

      Here is the JOB DESCRIPTION text:
      ---
      ${jobDescription}
      ---
    `;
  } else {
    // --- PROMPT 1: GENERAL ANALYSIS (UPGRADED) ---
    prompt = `
      You are an expert career coach... (The initial instructions are the same)

      The JSON object must have these exact keys: "overallScore", "summary", "keywordGaps", and "improvements".
      The "improvements" key must be an array of 3-4 objects. EACH object in the array must follow this exact JSON structure:
      ${improvementJsonStructure}

      Here is the resume text:
      ---
      ${resumeText}
      ---
    `;
  }

  try {
    const response = await groq.chat.completions.create({
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
