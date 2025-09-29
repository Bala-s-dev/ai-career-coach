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

export const generateInterviewQuestions = async (jobTitle) => {
  const prompt = `
    You are an expert interviewer and hiring manager for a top tech company.
    Your task is to generate 5 insightful interview questions for the job title of "${jobTitle}".
    The questions should cover a mix of technical skills, behavioral situations, and problem-solving abilities relevant to the role.

    Return your response as a structured JSON object. The object must have a single key named "questions" which is an array of 5 strings.
    Do not include any text or markdown formatting before or after the JSON object.
  `;

  try {
    const response = await groq.chat.completions.create({
      model: 'openai/gpt-oss-20b',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
    });

    const responseText = response.choices[0].message.content;
    return JSON.parse(responseText);
  } catch (error) {
    console.error('Error generating interview questions with Groq:', error);
    throw new Error('Failed to generate interview questions from AI service.');
  }
};

export const getAnswerFeedback = async (question, answer) => {
  const prompt = `
    You are an expert interview coach providing feedback.
    A candidate was asked the following interview question:
    ---
    Question: "${question}"
    ---
    The candidate provided this answer:
    ---
    Answer: "${answer}"
    ---
    Your task is to provide constructive feedback on the answer. Analyze its structure (like the STAR method), clarity, conciseness, and content. Be encouraging but also provide specific, actionable advice for improvement. Keep the feedback to 2-4 sentences.

    Return your feedback as a simple string. Do not use JSON or markdown.
  `;

  try {
    const response = await groq.chat.completions.create({
      model: 'openai/gpt-oss-20b',
      messages: [{ role: 'user', content: prompt }],
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating answer feedback with Groq:', error);
    throw new Error('Failed to generate answer feedback from AI service.');
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
      // ...
- \"matchScore\": A numerical score from 0 to 100. **Return only the integer value, do not include any text or slashes.**
//...
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
      // ...
Your analysis should be in a structured JSON format with the following keys: \"overallScore\" (a numerical score from 0-100, **return only the integer value**), ...
//...
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
