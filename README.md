# Assembly Line Car Workshop 🚗🛠️

> **Professional Car Services at Your Fingertips**

![Assembly Line Banner](https://via.placeholder.com/1200x300?text=Assembly+Line+Car+Workshop)

## 📌 Introduction

Welcome to the **Assembly Line Car Workshop** project! This is a modern, responsive, and high-performance web application designed for a premium auto repair shop. It allows customers to explore services, read testimonials, and easily book appointments online.

The application is built with **Next.js 15**, **React 19**, and **Tailwind CSS**, ensuring a fast and seamless user experience. It features a robust booking system that integrates with **Discord** for real-time notifications.

## ✨ Features

- **🚀 High Performance**: Built on Next.js 15 for optimal speed and SEO.
- **📱 Fully Responsive**: Looks stunning on mobile, tablet, and desktop devices.
- **🎨 Modern UI/UX**: Sleek design using Tailwind CSS and Radix UI components.
- **📅 Smart Booking System**: Users can schedule appointments with specific details (Car Make, Model, Services).
- **🔔 Real-time Notifications**: Booking requests are instantly sent to a Discord channel via Webhooks.
- **⭐ Customer Testimonials**: Showcases real feedback to build trust.
- **📍 Location & Contact**: Integrated map and contact information for easy access.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/) & [Lucide React](https://lucide.dev/) (Icons)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) validation
- **Notifications**: Discord Webhooks

## 🚀 Getting Started

Follow these instructions to set up the project on your local machine.

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18 or higher recommended)
- **npm**, **pnpm**, or **yarn**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/assembly-line.git
   cd assembly-line
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

### 🔐 Environment Variables

This project requires environment variables to function correctly, specifically for the booking notification system.

1. Create a `.env.local` file in the root directory.
2. Add the following variable:

```env
DISCORD_WEBHOOK_URL=your_discord_webhook_url_here
```

> **Note**: You can get a Webhook URL by going to your Discord Server Settings > Integrations > Webhooks.

### 🏃‍♂️ Running the Project

**Development Mode**:
Runs the app in development mode with hot-reloading.
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

**Production Build**:
Builds the app for production.
```bash
npm run build
```

**Start Production Server**:
Starts the production server after building.
```bash
npm run start
```

## 📂 Project Structure

Here is a quick overview of the main folders:

```
assembly-line/
├── app/                 # Next.js App Router pages and API routes
│   ├── api/             # Backend API routes (e.g., booking)
│   ├── layout.tsx       # Main app layout
│   └── page.tsx         # Homepage source
├── components/          # Reusable UI components (Hero, Navbar, etc.)
├── public/              # Static assets (images, icons)
├── styles/              # Global styles
├── .env.local           # Environment variables (not committed)
└── package.json         # Project dependencies and scripts
```

## 🐙 Git & GitHub Workflow

To push your changes to GitHub, follow these steps:

1. **Initialize Git** (if not already done):
   ```bash
   git init
   ```

2. **Add Remote Repository**:
   ```bash
   git remote add origin https://github.com/your-username/repo-name.git
   ```

3. **Stage and Commit Changes**:
   ```bash
   git add .
   git commit -m "Initial commit: Added complete project files"
   ```

4. **Push to GitHub**:
   ```bash
   git branch -M main
   git push -u origin main
   ```

---

Made with ❤️ by Assembly Line Team.
