# Event Management Platform

An Event Management Platform built with [Next.js](https://nextjs.org), [React](https://reactjs.org), [MongoDB](https://www.mongodb.com/), and [Tailwind CSS](https://tailwindcss.com/).

## Features

- Create and manage events.
- View event details.
- Search for events.
- Responsive design.
- Server-side rendering.
- Data validation with Zod.

## Prerequisites

- **Node.js** v16+
- **npm** or **yarn**

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/event-management-platform.git
   cd event-management-platform
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file and add your MongoDB connection string:

   ```dotenv
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Scripts

- **Start development server:** `npm run dev` or `yarn dev`
- **Build for production:** `npm run build` or `yarn build`
- **Start production server:** `npm start` or `yarn start`
- **Lint the code:** `npm run lint` or `yarn lint`

## Technologies Used

- **Next.js**, **React**, **MongoDB**, **Mongoose**, **Tailwind CSS**, **Zod**, **TypeScript**

## API Endpoints

- **GET** `/api/getEvents` - Fetch all events.
- **POST** `/api/postEvent` - Create a new event.
- **GET** `/api/events/[id]` - Fetch event details by ID.

## Database Reset and Seeding

To reset and seed the database, run:

```bash
node resetDatabase.js
```

Ensure your MongoDB URI is set in `.env.local`.
