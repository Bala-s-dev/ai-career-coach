# CareerCoachAI

An AI-powered career tools platform that helps you analyze your resume, search for jobs, and practice interviews — all in one place.

---

## Features

- **Resume Analyzer** — Upload a PDF resume and get an AI-generated score, keyword gap analysis, and before/after bullet point rewrites. Optionally paste a job description for targeted scoring.
- **Smart Job Search** — Search live job listings worldwide. After a resume analysis, the AI can auto-generate an optimized search query based on your skills.
- **Interview Coach** — Enter a target job title to get AI-generated interview questions. Submit your answers and receive detailed, actionable feedback instantly.

---

## Tech Stack

**Frontend**
- React 19 + Vite
- React Router v7
- Tailwind CSS
- Axios

**Backend**
- Node.js + Express 5
- MongoDB + Mongoose
- Passport.js (Google OAuth 2.0)
- Groq SDK (LLM inference)
- Multer + pdf-parse (resume file handling)
- express-session + connect-mongo (session persistence)
- Helmet + express-rate-limit (security)

---

## Project Structure

```
ai-career-coach/
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── ResumeAnalyzerPage.jsx
│   │   │   ├── JobSearchPage.jsx
│   │   │   └── InterviewPrepPage.jsx
│   │   ├── App.jsx
│   │   ├── api.js
│   │   └── index.css
│   └── package.json
│
└── server/                  # Express backend
    ├── config/
    │   ├── db.js            # MongoDB connection
    │   └── passport.js      # Google OAuth strategy
    ├── middleware/
    ├── models/
    │   ├── User.js
    │   └── Analysis.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── resumeRoutes.js
    │   ├── jobRoutes.js
    │   └── interviewRoutes.js
    ├── services/
    │   └── aiService.js     # Groq LLM calls
    └── index.js
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (local or Atlas)
- Google OAuth credentials
- Groq API key
- JSearch (RapidAPI) key for job listings

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ai-career-coach.git
cd ai-career-coach
```

### 2. Configure the server

Create `server/.env`:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
COOKIE_KEY=your_session_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5001/api/auth/google/callback

GROQ_API_KEY=your_groq_api_key
JSEARCH_API_KEY=your_rapidapi_jsearch_key

CLIENT_URL=http://localhost:5173
```

### 3. Configure the client

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5001/api
```

### 4. Install dependencies and run

```bash
# Server
cd server
npm install
npm run dev

# Client (in a new terminal)
cd client
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Environment Variables

| Variable | Location | Description |
|---|---|---|
| `PORT` | server | Port the Express server runs on (default: 5001) |
| `MONGO_URI` | server | MongoDB connection string |
| `COOKIE_KEY` | server | Secret used to sign session cookies |
| `GOOGLE_CLIENT_ID` | server | Google OAuth app client ID |
| `GOOGLE_CLIENT_SECRET` | server | Google OAuth app client secret |
| `GOOGLE_CALLBACK_URL` | server | OAuth redirect URI |
| `GROQ_API_KEY` | server | Groq API key for LLM inference |
| `JSEARCH_API_KEY` | server | RapidAPI key for JSearch job listings |
| `CLIENT_URL` | server | Frontend origin for CORS |
| `VITE_API_URL` | client | Base URL of the backend API |

---

## API Routes

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/auth/google` | Initiate Google OAuth login |
| `GET` | `/api/auth/google/callback` | OAuth callback |
| `GET` | `/api/auth/user` | Get current authenticated user |
| `GET` | `/api/auth/logout` | Log out and destroy session |
| `POST` | `/api/resume/analyze` | Analyze uploaded resume PDF |
| `GET` | `/api/resume/history` | Get user's analysis history |
| `POST` | `/api/resume/generate-job-query` | Generate a job search query from resume text |
| `GET` | `/api/jobs/search` | Search job listings via JSearch |
| `POST` | `/api/interview/questions` | Generate interview questions for a job title |
| `POST` | `/api/interview/feedback` | Get AI feedback on a submitted answer |

---

## Setting Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project and enable the **Google+ API** (or People API)
3. Under **Credentials**, create an OAuth 2.0 Client ID (Web application)
4. Add `http://localhost:5001/api/auth/google/callback` as an authorized redirect URI
5. Copy the Client ID and Secret into your `server/.env`

---

## Deployment Notes

- Set `cookie.secure: true` and `cookie.sameSite: 'none'` in the session config (already set) — required when the frontend and backend are on different origins over HTTPS.
- Update `CLIENT_URL`, `VITE_API_URL`, and `GOOGLE_CALLBACK_URL` to your production domains.
- The rate limiter allows 100 requests per IP per 15 minutes on all `/api` routes.

---
