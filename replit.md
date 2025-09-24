# DYMUN - Diplomatic Youth Model United Nations

## Overview

DYMUN (Diplomatic Youth Model United Nations) is a modern web application designed to facilitate Model United Nations conferences and educational experiences. The platform serves as a comprehensive solution for organizing, managing, and participating in MUN events, providing students with immersive diplomatic simulation experiences.

The application features a professional, dark-themed interface with animated components and smooth user interactions. It includes informational pages about the organization, resources for delegates, contact information, and registration capabilities for MUN conferences.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type-safe component development
- **Routing**: Wouter for lightweight client-side routing with page transitions
- **State Management**: TanStack React Query for server state management and data fetching
- **Animation**: Framer Motion for page transitions, scroll animations, and interactive elements
- **Styling**: Tailwind CSS with custom design system and dark theme implementation
- **UI Components**: Radix UI primitives with custom shadcn/ui component library

### Design System
- **Component Library**: shadcn/ui with "new-york" style configuration
- **Theme**: Dark mode with gold/yellow accent colors (hsl(45 100% 51%))
- **Typography**: Inter for body text, Playfair Display for headings, Fira Code for monospace
- **Responsive Design**: Mobile-first approach with responsive breakpoints

### Backend Architecture
- **Runtime**: Node.js with Express.js web framework
- **Language**: TypeScript with ES modules for modern JavaScript features
- **API Design**: RESTful API structure with /api prefix for all endpoints
- **Development Server**: Vite integration for hot module replacement and development tooling

### Data Storage
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL with Neon serverless database provider
- **Schema**: Shared schema definitions between client and server
- **Migrations**: Drizzle Kit for database schema management
- **Development Storage**: In-memory storage implementation for development/testing

### Authentication & Session Management
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple
- **User Management**: Username/password authentication system
- **Schema**: User table with id, username, and password fields

### Build & Development
- **Build Tool**: Vite for frontend bundling with React plugin
- **Server Build**: esbuild for backend compilation to ES modules
- **Development**: Hot reload with Vite middleware integration
- **TypeScript**: Strict type checking across frontend, backend, and shared modules

### Project Structure
- **Monorepo**: Single repository with client/, server/, and shared/ directories
- **Path Aliases**: Configured aliases for clean imports (@/ for client, @shared/ for shared)
- **Asset Management**: Separate attached_assets directory for static resources

## External Dependencies

### Database & Infrastructure
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Environment**: DATABASE_URL environment variable for database connection

### UI & Component Libraries
- **Radix UI**: Comprehensive set of unstyled, accessible UI primitives
- **Lucide React**: Icon library for consistent iconography
- **shadcn/ui**: Pre-built component library based on Radix UI primitives

### Development & Build Tools
- **Replit Integration**: 
  - Runtime error overlay for development debugging
  - Cartographer plugin for enhanced development experience
  - Development banner for Replit environment
- **PostCSS**: CSS processing with Tailwind CSS and Autoprefixer

### Animation & Interaction
- **Framer Motion**: Advanced animation library for React components
- **Embla Carousel**: Carousel/slider functionality for content display

### Form & Validation
- **React Hook Form**: Performant form library with minimal re-renders
- **Zod**: Schema validation library integrated with Drizzle ORM
- **Hookform Resolvers**: Integration between React Hook Form and Zod

### Utility Libraries
- **date-fns**: Date manipulation and formatting utilities
- **clsx & Tailwind Merge**: Conditional CSS class name utilities
- **cmdk**: Command palette component for enhanced UX
- **nanoid**: Unique ID generation for various application needs

### Development Dependencies
- **TypeScript**: Type system for JavaScript with strict configuration
- **tsx**: TypeScript execution for development server
- **Various @types packages**: Type definitions for Node.js and other libraries