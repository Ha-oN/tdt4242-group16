# tdt4242-group16

/ai-study-pilot
├── /app
│   ├── /api/chat/route.ts      # The "Bridge" between your UI and the AI
│   ├── /dashboard
│   │   ├── page.tsx            # REQ-01: The main dashboard view
│   │   └── /chat/[id]/page.tsx # REQ-01: Specific conversation window
│   ├── layout.tsx              # Sidebar and Navigation
│   └── globals.css             # Just the Tailwind setup (no custom CSS)
├── /components
│   ├── /chat-ui
│   │   ├── mode-selector.tsx   # REQ-02 & REQ-10: Button to switch Brainstorm/Tutor
│   │   ├── pii-warning.tsx     # REQ-29: Red alert if phone/email is typed
│   │   └── citation-box.tsx    # REQ-03: Displays the source slides/notes
│   └── sidebar.tsx             # Academic vs Private folder sorting
├── /lib
│   ├── /ai
│   │   ├── prompts.ts          # REQ-10: Instructions for "Tutor Mode"
│   │   └── score-logic.ts      # REQ-19: Confidence score calculator
│   └── supabase.ts             # Connection to your database
├── /utils
│   └── pii-scanner.ts          # REQ-29: The Regex code to find emails/phones
└── middleware.ts               # Blocks access if not logged in