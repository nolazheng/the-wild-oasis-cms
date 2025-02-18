# The Wild Oasis: A Comprehensive Hotel Management System

<img width="100" src="/public/logo-light.png" alt="The Wild Oasis Dashboard" />

https://the-wild-oasis-cms.vercel.app/

The Wild Oasis is a robust hotel management application designed to streamline operations for small to medium-sized hotels. It offers a user-friendly interface for managing bookings, cabins, and guest information.

This application provides a comprehensive solution for hotel staff to handle day-to-day operations efficiently. It includes features such as real-time dashboard analytics, booking management, cabin inventory control, and guest check-in/check-out processes. The Wild Oasis is built with modern web technologies, ensuring a responsive and intuitive user experience.

## Repository Structure

```
.
├── src/
│   ├── App.tsx                 # Main application component
│   ├── context/                # React context definitions
│   ├── data/                   # Data management and uploader
│   ├── features/               # Feature-specific components and hooks
│   ├── hooks/                  # Custom React hooks
│   ├── pages/                  # Page components
│   ├── services/               # API service functions
│   ├── styles/                 # Global styles and theme
│   ├── types.ts                # TypeScript type definitions
│   └── ui/                     # Reusable UI components
├── index.html                  # HTML entry point
├── package.json                # Project dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite build configuration
└── vercel.json                 # Vercel deployment configuration
```

## Usage Instructions

### Installation

Install dependencies:

```
npm install
```

### Getting Started

1. Set up environment variables:
   Create a `.env` file in the root directory and add the necessary environment variables (e.g., API keys, database connection strings).

2. Start the development server:
   ```
   npm run dev
   ```
3. Open your browser and navigate to `http://localhost:5173` to view the application.

### Configuration

The application can be configured through environment variables. Key configuration options include:

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_KEY`: Your Supabase API key

### Common Use Cases

1. Dashboard Overview:
   Navigate to the dashboard to view key metrics and recent bookings.

2. Managing Bookings:

   ```typescript
   import { useGetBookings } from '@/features/bookings/hooks/useGetBookings';

   const { bookings, isLoading } = useGetBookings();
   // Use the bookings data to display or manipulate booking information
   ```

3. Check-in/Check-out Process:

   ```typescript
   import { useCheckOut } from '@/features/check-in-out/hooks/useCheckOut';

   const { checkOut, isCheckingOut } = useCheckOut();
   // Call checkOut(bookingId) to process a guest check-out
   ```

### Testing & Quality

To run the test suite:

```
npm run test
```

### Troubleshooting

1. Issue: Application fails to start

   - Ensure all environment variables are correctly set in the `.env` file
   - Verify that all dependencies are installed by running `npm install`
   - Check the console for any error messages and address them accordingly

2. Issue: API requests failing

   - Confirm that your Supabase project is running and accessible
   - Verify that the Supabase URL and API key in the `.env` file are correct
   - Check your network connection and firewall settings

3. Debugging:
   - Use the React Developer Tools browser extension for component debugging
   - Enable React Query Devtools by setting `initialIsOpen={true}` in `App.tsx`
   - Check the browser console for any error messages or warnings

## Data Flow

The Wild Oasis application follows a client-side rendering architecture with React Query for state management and data fetching. Here's an overview of the data flow:

1. User interacts with the UI components in the `features/` directory.
2. Components use custom hooks (e.g., `useGetBookings`, `useCheckOut`) to manage data and actions.
3. These hooks utilize React Query to fetch data from or send updates to the Supabase backend via service functions in the `services/` directory.
4. The Supabase client in `services/supabase.ts` handles API requests to the Supabase backend.
5. React Query manages the caching and synchronization of data between the UI and the backend.

```
User Interaction
     │
     ▼
UI Components
     │
     ▼
Custom Hooks
     │
     ▼
React Query
     │
     ▼
API Services
     │
     ▼
Supabase Client
     │
     ▼
Supabase Backend
```

This architecture ensures efficient data management, real-time updates, and a smooth user experience throughout the application.
