# Parking Enforcement Back Office Dashboard

A comprehensive admin dashboard for parking enforcement companies built with Nuxt 3, TypeScript, and Cloudflare infrastructure.

## Features

- **Authentication & Security**
  - Secure login with JWT tokens
  - Two-factor authentication support
  - Role-based access control (admin/officer)
  - Admin impersonation capabilities

- **Dashboard Overview**
  - Real-time statistics and KPIs
  - Interactive charts showing ticket trends
  - Recent activity feeds
  - Officer status monitoring

- **Property Management**
  - CRUD operations for properties
  - Enforcement hours configuration
  - Guest limit and grace period settings
  - Document upload capabilities

- **Officer Management**
  - Staff CRUD operations
  - Property assignments
  - Performance metrics
  - Shift tracking

- **Ticketing System**
  - Comprehensive ticket management
  - Advanced filtering and search
  - Bulk operations
  - Export capabilities

- **Billing & Invoicing**
  - Automated invoice generation
  - PDF export functionality
  - Payment tracking
  - Integration hooks for Stripe/QuickBooks

- **Reports & Analytics**
  - Violation analytics
  - Officer productivity reports
  - Revenue tracking
  - GPS heatmaps

- **Audit & Compliance**
  - Complete audit trail
  - Activity logging
  - Searchable logs with filters

## Tech Stack

- **Frontend**: Nuxt 3, Vue 3, TypeScript, Tailwind CSS
- **Backend**: Nuxt 3 Server Routes
- **Authentication**: JWT with bcrypt
- **Charts**: Chart.js with vue-chartjs
- **Icons**: Heroicons
- **State Management**: Pinia
- **Deployment**: Cloudflare Workers & Pages

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd parking-enforcement-backoffice
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
JWT_SECRET=your-super-secret-jwt-key
NUXT_PUBLIC_APP_NAME=Parking Enforcement Admin
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Demo Credentials

- **Email**: admin@parkingco.com
- **Password**: password123

## Project Structure

```
├── assets/css/           # Global styles
├── components/           # Vue components
├── layouts/             # Layout components
├── middleware/          # Route middleware
├── pages/              # Application pages
├── plugins/            # Nuxt plugins
├── server/api/         # API routes
├── stores/             # Pinia stores
├── types/              # TypeScript definitions
└── utils/              # Utility functions
```

## API Endpoints

### Authentication
- `POST /api/admin/auth/login` - User login
- `GET /api/admin/auth/me` - Get current user
- `POST /api/admin/auth/logout` - User logout
- `POST /api/admin/auth/impersonate` - Admin impersonation

### Dashboard
- `GET /api/admin/dashboard/stats` - Dashboard statistics

### Properties (Coming Soon)
- `GET /api/admin/properties` - List properties
- `POST /api/admin/properties` - Create/update property
- `DELETE /api/admin/properties/:id` - Delete property

### Officers (Coming Soon)
- `GET /api/admin/officers` - List officers
- `POST /api/admin/officers` - Create/update officer
- `DELETE /api/admin/officers/:id` - Delete officer

### Tickets (Coming Soon)
- `GET /api/admin/tickets` - List/filter tickets
- `POST /api/admin/tickets/:id/void` - Void ticket
- `GET /api/admin/tickets/export` - Export tickets

### Invoices (Coming Soon)
- `GET /api/admin/invoices` - List invoices
- `POST /api/admin/invoices` - Create invoice
- `GET /api/admin/invoices/:id/pdf` - Download PDF

### Reports (Coming Soon)
- `GET /api/admin/reports/violations` - Violation reports
- `GET /api/admin/reports/officers` - Officer reports
- `GET /api/admin/reports/revenue` - Revenue reports

### Audit (Coming Soon)
- `GET /api/admin/logs/audit` - Audit trail

## Deployment

### Cloudflare Pages

1. Build the application:
```bash
npm run build
```

2. Deploy to Cloudflare Pages:
```bash
npx wrangler pages publish dist
```

### Environment Variables

Set the following environment variables in Cloudflare Pages:

- `JWT_SECRET`: Your JWT secret key
- `NUXT_PUBLIC_APP_NAME`: Application name

## Development

### Running Tests

```bash
npm run test
```

### Code Style

```bash
npm run lint
npm run lint:fix
```

### Type Checking

```bash
npm run typecheck
```

## Database Integration

The application is designed to work with various databases. Current implementation uses mock data, but you can easily integrate:

### Cloudflare D1 (Recommended)

1. Install Cloudflare D1:
```bash
npm install @cloudflare/d1
```

2. Update server routes to use D1 queries
3. Configure database schema

### MongoDB Atlas

1. Install MongoDB driver:
```bash
npm install mongodb
```

2. Update server routes with MongoDB queries
3. Configure connection string

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions, please contact the development team or create an issue in the repository.