# Contact Hub (Address Book) 📇

> A modern, full-stack contact management application built with Next.js, Tailwind CSS, and Supabase.

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

## 🌟 Overview

Contact Hub is a sleek, responsive, and highly interactive address book web application. It allows you to seamlessly manage your personal and professional contacts with a beautiful user interface powered by Radix UI, Framer Motion, and Tailwind CSS. The backend is robust and fast, leveraging Supabase as a PostgreSQL database.

## ✨ Features

- **Full CRUD functionality:** Create, read, update, and delete contacts effortlessly.
- **Favorites:** Quickly star your most important contacts for easy access.
- **Categorization:** Organize contacts by custom categories (e.g., Work, Personal) and statuses.
- **Beautiful Animations:** Smooth page transitions and micro-interactions powered by `framer-motion`.
- **Modern UI Components:** Accessible and unstyled primitive components from Radix UI, styled with Tailwind CSS.
- **Real-time Toasts:** Instant feedback for user actions via `sonner`.

## 🛠 Tech Stack

**Frontend:**
- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, `tw-animate-css`, `clsx`, `tailwind-merge`
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **UI Primitives:** Radix UI (`dialog`, `alert-dialog`, `slot`)
- **Notifications:** Sonner

**Backend & Database:**
- **BaaS:** [Supabase](https://supabase.com/) (`@supabase/supabase-js`, `@supabase/ssr`)
- **API:** Next.js Server Routes

## 🗺 API Routes

The application exposes the following RESTful endpoints under `/api/contacts`:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/contacts` | Fetch a list of all contacts, ordered by creation date. |
| `POST` | `/api/contacts` | Create a new contact. |
| `PUT` | `/api/contacts/[id]` | Update the details of an existing contact. |
| `PATCH`| `/api/contacts/[id]` | Partially update a contact (e.g., toggle `favorite` status). |
| `DELETE`| `/api/contacts/[id]` | Delete a contact from the database. |

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v18 or higher)
- npm, yarn, or pnpm
- A Supabase project

### 1. Clone the repository
```bash
git clone https://github.com/AmanSingh007coder/Address-Book.git
cd Address-Book
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🤝 Contributors

This project is brought to you by:

- **Aman Kumar Singh** - GitHub: [@AmanSingh007coder](https://github.com/AmanSingh007coder)
- **Anshuman Pati** - GitHub: [@anshu2k24](https://github.com/anshu2k24)

---
*Built with ❤️ for better contact management.*
