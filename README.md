# myFreeResume Frontend

React SPA for creating job-specific resumes and cover letters.

## Setup

```bash
npm install
```

Create a `.env` file:
```
VITE_API_URL=http://localhost:8000
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Test

```bash
npx vitest run
```

## Features

- Dashboard with expandable job type cards and entry management
- Entry editor with Resume and Cover Letter tabs
- Auto-save with 2-second debounce
- Clone entries across job types
- Reset resume from user profile template
- **Document Preview** — in-browser DOCX preview for both resume and cover letter using `docx-preview`, rendered in a modal dialog with download option
- DOCX download for resume and cover letter

## Tech Stack

- React 19 + Vite
- Tailwind CSS + shadcn/ui
- React Query (TanStack Query)
- React Router v7
