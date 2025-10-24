# Car Website - Unified Project

This is a unified React application that combines both the public marketing website and the authenticated user dashboard into a single project.

## Project Structure

```
unified-project/
├── src/
│   ├── components/
│   │   ├── layout/          # Layout components (PublicLayout, PrivateLayout, etc.)
│   │   ├── public/          # Public website components
│   │   ├── dashboard/       # Dashboard-specific components
│   │   ├── auth/            # Authentication components
│   │   └── common/          # Shared components
│   ├── pages/
│   │   ├── public/          # Public pages (Home, Privacy, Terms)
│   │   ├── dashboard/       # Protected dashboard pages
│   │   ├── auth/            # Authentication pages
│   │   └── common/          # Shared pages (404, etc.)
│   ├── context/             # React contexts (Auth, Cart)
│   ├── hooks/               # Custom hooks
│   ├── services/            # API services
│   ├── routing/             # Routing configuration
│   └── utils/               # Utility functions
├── public/                  # Static assets
└── package.json
```

## Features

### Public Routes (No Authentication Required)
- **Home Page** (`/`) - Marketing landing page with hero, plans, advantages, FAQ, and contact sections
- **Privacy Policy** (`/privacy-policy`) - Privacy policy page
- **Terms of Use** (`/terms-of-use`) - Terms of use page

### Authentication Routes (Redirect authenticated users)
- **Login** (`/login`) - User login page
- **Signup** (`/signup`) - User registration page
- **Forgot Password** (`/forgot-password`) - Password reset request
- **Reset Password** (`/reset-password`) - Password reset form
- **Confirm Email** (`/confirm-email`) - Email confirmation page

### Protected Dashboard Routes (Authentication Required)
- **Dashboard Home** (`/dashboard`) - Main dashboard overview
- **New Consultation** (`/new-consultation`) - Start new vehicle consultation
- **History** (`/history`) - View consultation history
- **My Recommendations** (`/my-recommendations`) - Personalized recommendations
- **Profile** (`/profile`) - User profile management
- **Purchases** (`/purchases`) - Purchase history
- **Always Connected** (`/always-connected`) - 24/7 monitoring services
- **Delete Account** (`/delete-account`) - Account deletion
- **Blogs** (`/blogs`) - Blog articles
- **Contact** (`/contact`) - Contact support

## Technology Stack

- **React 19.1.1** - Frontend framework
- **React Router DOM 7.9.4** - Client-side routing
- **Tailwind CSS 4.1.14** - Styling framework
- **React Hook Form 7.65.0** - Form handling
- **Zod 4.1.12** - Schema validation
- **Axios 1.12.2** - HTTP client
- **React Toastify 11.0.5** - Notifications
- **Swiper 12.0.2** - Carousel/slider components
- **Vite 7.1.7** - Build tool

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Navigate to the unified project directory:
```bash
cd unified-project
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=your_api_base_url_here
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Authentication Flow

1. **Public Access**: Non-authenticated users can view the marketing website
2. **Automatic Redirect**: Authenticated users are automatically redirected to `/dashboard` when visiting public pages
3. **Registration**: New users can sign up through the `/signup` page
4. **Login**: Existing users can log in through the `/login` page
5. **Protected Routes**: Authenticated users can access all dashboard features
6. **Logout**: Users can log out from the sidebar in the dashboard

## Key Features

### Public Website
- Responsive design with mobile-first approach
- Smooth scrolling navigation
- Hero section with call-to-action
- Pricing plans section
- Advantages/features showcase
- FAQ section
- Contact form
- Footer with company information

### User Dashboard
- Sidebar navigation with collapsible sections
- Top bar with user info and cart
- Protected route system
- Shopping cart functionality
- User profile management
- Consultation history
- Purchase tracking
- Blog integration
- Support contact

### Authentication System
- JWT token-based authentication
- Automatic token refresh
- Protected route guards
- Form validation with Zod schemas
- Password strength requirements
- Email confirmation flow

## Development Notes

- The project uses a unified routing system that handles both public and protected routes
- Authentication state is managed through React Context
- All API calls are centralized through the `apiClient` service
- Form validation is handled by React Hook Form with Zod schemas
- The design system uses Tailwind CSS with custom components
- Assets are organized in the `public` directory with subdirectories for different types

## Deployment

The project is configured for deployment on Vercel with the included `vercel.json` configuration. Simply connect your repository to Vercel and deploy.

## Contributing

1. Follow the existing code structure and naming conventions
2. Use TypeScript for type safety (when migrating from JS)
3. Follow React best practices and hooks patterns
4. Ensure responsive design for all new components
5. Add proper error handling and loading states
6. Write meaningful commit messages

## License

This project is proprietary and confidential.
