# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Bankura2Block is a full-stack React application cloning a government website with responsive design and colorful UI. The project consists of a TypeScript React frontend with Tailwind CSS and a Node.js Express backend.

## Development Commands

### Frontend Development
```bash
cd frontend
npm install          # Install dependencies
npm start            # Start development server (runs on http://localhost:3000)
npm run build        # Create production build
npm test             # Run tests
```

### Backend Development
```bash
cd backend
npm install          # Install dependencies
npm run dev          # Start development server with nodemon (runs on http://localhost:5000)
npm start            # Start production server
```

### Full Stack Development
To run both frontend and backend simultaneously:
1. Start backend: `cd backend && npm run dev`
2. Start frontend: `cd frontend && npm start`

### Testing and Code Quality
```bash
# Frontend testing
cd frontend
npm test                    # Run Jest tests
npm test -- --watchAll     # Run tests in watch mode

# TypeScript compilation check
npx tsc --noEmit           # Check TypeScript without emitting files
```

## Architecture Overview

### Frontend Architecture (React + TypeScript)
- **Component Structure**: Organized into reusable UI components in `src/components/`
- **Hooks Pattern**: Custom hooks in `src/hooks/` for API interactions and state management
- **API Layer**: Centralized API configuration in `src/utils/api.ts` with axios interceptors
- **Styling**: Tailwind CSS with custom design system (primary, secondary, accent color schemes)
- **TypeScript**: Strict type checking enabled with comprehensive type definitions

### Backend Architecture (Node.js + Express)
- **RESTful API**: Express.js server with middleware for CORS, body parsing, and error handling
- **API Endpoints**:
  - `/api/health` - Health check endpoint
  - `/api/services` - Services data
  - `/api/news` - News and updates
  - `/api/contact` - Contact form submission
- **Environment Configuration**: Uses dotenv for environment variables
- **Error Handling**: Centralized error handling middleware with development/production modes

### Key Architectural Patterns

1. **API Abstraction**: All API calls go through custom hooks (`useApi`, `useServices`, `useContactForm`) that handle loading states, errors, and data management
2. **Error Handling**: Consistent error handling across the application with user-friendly error messages
3. **Component Composition**: Single-responsibility components that can be easily reused and tested
4. **Type Safety**: Comprehensive TypeScript interfaces for API responses, form data, and component props

## Design System and Styling

### Color Scheme
- **Primary**: Blue tones (#3b82f6 family) for main branding and navigation
- **Secondary**: Orange tones (#d97706 family) for accents and highlights  
- **Accent**: Green tones (#10b981 family) for success states and CTAs

### Custom Tailwind Configuration
- Extended color palette with 50-900 shades for each color family
- Custom font families: Inter (sans) and Poppins (display)
- Custom animations: fade-in, slide-up, bounce-slow
- Responsive design with mobile-first approach

## Component Guidelines

### API Integration Pattern
```typescript
// Use custom hooks for API calls
const { data: services, loading, error } = useServices();

// Handle form submissions with error states
const { submitContact, loading, error, success } = useContactForm();
```

### Component Structure
- Functional components with TypeScript interfaces
- Props destructuring with default values
- Consistent className patterns using Tailwind utility classes
- Responsive design with breakpoint prefixes (sm:, md:, lg:, xl:)

## Environment Configuration

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_APP_NAME=Bankura II Block
REACT_APP_VERSION=1.0.0
```

### Backend (.env)
```
PORT=5000
NODE_ENV=development
```

## File Structure Context

```
bankura2block-clone/
├── frontend/              # React TypeScript application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/         # Custom React hooks for API and state
│   │   ├── utils/         # Utility functions and API configuration
│   │   └── pages/         # Page components (ready for routing)
│   ├── tailwind.config.js # Tailwind CSS configuration
│   └── package.json
├── backend/               # Node.js Express server
│   ├── server.js         # Main server file with all routes
│   ├── .env             # Environment variables
│   └── package.json
├── docs/                 # Project documentation
├── README.md
└── PROJECT_SETUP.md      # Detailed setup guide
```

## API Endpoint Reference

### GET Endpoints
- `GET /api/health` - Server health check
- `GET /api/services` - Retrieve service listings
- `GET /api/news` - Retrieve news/updates

### POST Endpoints
- `POST /api/contact` - Submit contact form
  - Required fields: name, email, message
  - Optional fields: phone

## Development Notes

### Code Style Preferences
- Use functional components with hooks over class components
- Implement proper TypeScript typing for all props and API responses
- Follow the existing error handling patterns using custom hooks
- Maintain consistent Tailwind class ordering (positioning, display, spacing, colors, etc.)

### State Management
- Uses React's built-in useState and useEffect hooks
- Custom hooks encapsulate complex state logic and API interactions
- No external state management library (Redux, Zustand) currently implemented

### Responsive Design Approach
- Mobile-first design philosophy
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly navigation and interactions
- Gradient backgrounds and modern visual effects

## Testing Strategy
- Jest for unit testing (React Testing Library setup included)
- Component testing focuses on user interactions and API integration
- No end-to-end testing framework currently configured

## Deployment Considerations
- Frontend builds to static files that can be served by any web server
- Backend requires Node.js runtime environment
- Environment variables must be configured for production deployments
- CORS configuration may need adjustment for production domains
