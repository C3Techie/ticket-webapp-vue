# Vue Ticket Management App

A modern, responsive ticket management application built with Vue 3, TypeScript, and Tailwind CSS.

## Features

- **Modern UI/UX**: Beautiful design with smooth animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Authentication**: Login/signup with session management
- **Ticket Management**: Full CRUD operations for tickets
- **Real-time Validation**: Form validation with Vue reactivity
- **Accessibility**: WCAG compliant with proper ARIA attributes
- **Toast Notifications**: User feedback for all actions

## Tech Stack

- **Frontend**: Vue 3, TypeScript, Composition API
- **Styling**: Tailwind CSS with custom design system
- **Routing**: Vue Router
- **Icons**: Lucide Vue
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone [<repository-url>](https://github.com/C3Techie/ticket-webapp-vue.git)
   cd ticket-webapp-vue
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
ticket-webapp-vue/
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── layout/        # Header, Footer, Hero, ProtectedRoute
│   │   ├── ui/            # Button, Input, ToastContainer, Modal
│   │   ├── auth/          # LoginForm, SignupForm
│   │   ├── dashboard/     # Dashboard, StatsCard
│   │   └── tickets/       # TicketManagement, TicketCard, TicketForm
│   ├── composables/       # Vue composables (useAuth, useTickets, useToast)
│   ├── directives/        # Custom directives (inView)
│   ├── router/            # Vue Router config
│   ├── styles/            # Global styles (globals.css)
│   ├── types/             # TypeScript types
│   ├── utils/             # Utility functions (storage)
│   ├── views/             # Page-level components (LandingPage)
│   ├── App.vue            # App root
│   ├── main.ts            # Entry point
│   └── vue-shims.d.ts     # TypeScript shims for Vue
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
```

---

## Example Test User Credentials

- **Demo User:**
  - Email: `demo@example.com`
  - Password: `password`

You can also sign up with a new account.

---

## Accessibility & Known Issues

- All interactive elements have visible focus states and ARIA labels.
- Color contrast meets WCAG guidelines.
- Forms are accessible to screen readers.
- If you find any accessibility issues, please open an issue or PR.

---

## Switching Between Implementations

This repository contains the **Vue.js** implementation.
- For **React** and **Twig** versions, see the root README or visit the respective repositories:
  - [ticket-webapp-react](https://github.com/C3Techie/ticket-webapp-react.git)
  - [ticket-webapp-twig](https://github.com/C3Techie/ticket-webapp-twig.git)

---

## Notes

- The layout, design, and logic are consistent across all framework versions as per the task requirements.
- Authentication and ticket data are simulated using localStorage (`ticketapp_session`).
- All protected routes require a valid session token.
- Status color rules: `open` (green), `in_progress` (amber), `closed` (gray).

---