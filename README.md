# Nexus Digital Store

A premium AI-powered digital e-commerce platform built with Next.js 14, featuring modern UI/UX, secure payments, and intelligent product recommendations.

## Features

- 🎨 Modern, responsive UI with dark/light mode
- 🤖 AI-powered product recommendations
- 📊 Admin dashboard with analytics
- 💳 Secure Stripe payment integration
- 📱 Mobile-first responsive design
- 🔍 Smart search and filtering
- 📈 SEO optimized with schema markup
- 📊 Google Sheets product sync
- 🔐 Secure authentication with NextAuth.js

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **AI**: OpenAI API
- **State Management**: Zustand
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Stripe account
- Google Cloud account (for Sheets integration)
- OpenAI API key (for AI features)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/nexus-digital-store.git
cd nexus-digital-store
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your `.env` file with your credentials.

5. Set up the database:
```bash
npm run db:generate
npm run db:push
npm run db:seed
```

6. Start the development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Admin Access

After seeding, use these credentials to access the admin dashboard:
- Email: admin@nexus.store
- Password: admin123

## Google Sheets Integration

To sync products from Google Sheets:

1. Create a Google Cloud project
2. Enable the Google Sheets API
3. Create a service account and download credentials
4. Share your spreadsheet with the service account email
5. Configure the environment variables

### Spreadsheet Format

| Name | Description | Price | Compare Price | Category | Tags | Images | File URL | Status |
|------|-------------|-------|---------------|----------|------|--------|----------|--------|
| Product Name | Description | 99.99 | 149.99 | Software | tag1,tag2 | url1,url2 | download-url | PUBLISHED |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Configure environment variables
4. Deploy

### Docker

```bash
docker build -t nexus-store .
docker run -p 3000:3000 nexus-store
```

## License

MIT License - see LICENSE file for details.
