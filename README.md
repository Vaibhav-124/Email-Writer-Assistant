# Email Writer Assistant

AI-powered Chrome extension that generates smart email replies using React, Spring Boot, and Gemini API integration.

---

## Project Structure

```bash
Email-Writer-Assistant/
│
├── backend
├── frontend
└── extension
```

---

## Backend Setup

Navigate to backend folder:

```bash
cd backend
```

Run the Spring Boot application:

```bash
mvn spring-boot:run
```

Backend runs on:

```text
http://localhost:8080
```

---

## Environment Variables (IntelliJ)

Go to:

```text
Run → Edit Configurations → Environment Variables
```

Add the following:

```env
GEMINI_URL=https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=
GEMINI_KEY=your_api_key
```

---

## API Testing (Postman)

### Endpoint

```http
POST http://localhost:8080/api/email/generate
```

### Request Body

```json
{
  "emailContent": "I am not available tomorrow",
  "tone": "professional"
}
```

---

## Frontend Setup

Move to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Chrome Extension Setup

1. Open Chrome browser
2. Visit:

```text
chrome://extensions/
```

3. Enable **Developer Mode**
4. Click **Load unpacked**
5. Select the `extension` folder

---

## Important

Backend server must be running for both the frontend and Chrome extension to work properly.
