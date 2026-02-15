# 🚗 GaariHaat Admin Portal

<div align="center">

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-Latest-000000?style=for-the-badge&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)

**Modern, Responsive Admin Dashboard for Vehicle Marketplace Management**

[Features](#-features) • [Installation](#-installation) • [Configuration](#%EF%B8%8F-configuration) • [Usage](#-usage) • [API Integration](#-api-integration)

</div>

---

## 📋 Overview

GaariHaat Admin Portal is a powerful, modern web application built with React, TypeScript, and shadcn/ui components. It provides administrators with comprehensive tools to manage vehicles, users, payments, and analytics for the GaariHaat vehicle marketplace platform.

### 🔗 Related Repositories

- **Backend API**: [NestJS Backend Repository](https://github.com/mh-rabbi/Backend-eCommerce-Solution-of-used-Car-bike)
- **Mobile App**: [Flutter Mobile App](https://github.com/mh-rabbi/eCommerce-solution-for-used-car-bike)

---

## ✨ Features

### 🎯 Core Functionality

- **🔐 Authentication & Authorization**
  - Secure admin login with JWT
  - Role-based access control
  - Protected routes with automatic redirection
  - Session management

- **📊 Dashboard Analytics**
  - Real-time statistics and KPIs
  - Revenue tracking and growth metrics
  - Interactive charts (Revenue, Sales, Brands)
  - Recent activity timeline
  - Conversion rate analysis

- **🚙 Vehicle Management**
  - Pending approvals queue
  - Approve/reject vehicles
  - View detailed vehicle information
  - Filter and search functionality
  - Status tracking (Pending, Approved, Rejected, Sold)
  - Multi-image gallery support

- **👥 User Management**
  - View all registered users
  - User profile details
  - Delete user accounts (non-admins)
  - Search and filter users
  - Role assignment viewing

- **💰 Payment Management**
  - View completed payments
  - Platform fee tracking (5% bikes, 8% cars)
  - Transaction details
  - Payment method information
  - SSLCommerz integration data

- **📈 Advanced Analytics**
  - Brand distribution charts
  - Vehicle type analysis
  - Sales performance metrics
  - Growth trend visualization
  - Top sellers ranking

### 🎨 UI/UX Features

- **Modern Design System**
  - Clean, professional interface
  - Dark/Light theme support
  - Consistent design tokens
  - Smooth animations and transitions
  - Responsive layouts

- **Component Library**
  - shadcn/ui components
  - Radix UI primitives
  - Recharts for data visualization
  - Lucide icons
  - Custom form components

- **Enhanced User Experience**
  - AI Assistant chatbot
  - Toast notifications
  - Loading states
  - Error handling
  - Pagination
  - Real-time updates

---

## 🛠️ Tech Stack

### Frontend Framework
- **React 18.3.1** - UI library
- **TypeScript 5.8.3** - Type safety
- **Vite 5.4.19** - Build tool and dev server

### UI Components & Styling
- **shadcn/ui** - Component library
- **Radix UI** - Headless UI primitives
- **Tailwind CSS 3.4.17** - Utility-first CSS
- **class-variance-authority** - Variant styling
- **tailwind-merge** - Class merging
- **tailwindcss-animate** - Animation utilities

### State & Data
- **TanStack React Query 5.83.0** - Server state management
- **React Hook Form 7.61.1** - Form handling
- **Zod 3.25.76** - Schema validation

### Charts & Visualization
- **Recharts 2.15.4** - Chart library
- **Lucide React 0.462.0** - Icon library

### Routing
- **React Router DOM 6.30.1** - Client-side routing

### Utilities
- **date-fns 3.6.0** - Date manipulation
- **clsx 2.1.1** - Conditional classes
- **sonner 1.7.4** - Toast notifications

---

## 📦 Installation

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 or **yarn** >= 1.22.0
- **Backend API** running (see [Backend Repository](https://github.com/mh-rabbi/Backend-eCommerce-Solution-of-used-Car-bike))

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/mh-rabbi/Admin-Portal-eCommerce-solution-for-used-car-bike.git
   cd Admin-Portal-eCommerce-solution-for-used-car-bike
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_URL=http://localhost:3000

# Optional: Production API
# VITE_API_URL=https://api.yourdomain.com
```

### API Endpoints

The admin portal communicates with the following backend endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/auth/login` | POST | Admin authentication |
| `/admin/vehicles/pending` | GET | Get pending vehicles |
| `/admin/vehicles/:id/approve` | POST | Approve vehicle |
| `/admin/vehicles/:id/reject` | POST | Reject vehicle |
| `/admin/vehicles/sold` | GET | Get sold vehicles |
| `/admin/users` | GET | Get all users |
| `/admin/users/:id` | GET | Get user details |
| `/admin/users/:id` | DELETE | Delete user |
| `/payments/paid` | GET | Get paid payments |
| `/payments/vehicle/:id` | GET | Get payment by vehicle |
| `/analytics` | GET | Get analytics data |
| `/analytics/brands` | GET | Get brand analytics |
| `/analytics/types` | GET | Get type analytics |

---

## 🚀 Usage

### Building for Production

```bash
# Production build
npm run build

# Preview production build
npm run preview
```

### Development Build

```bash
# Development build (for testing)
npm run build:dev
```

### Linting

```bash
npm run lint
```

---

## 🔐 Authentication

### Admin Login

The portal requires admin credentials to access. Default admin account should be created in the backend:

```typescript
// Example login credentials (configure in backend)
{
  email: "admin@GaariHaat.com",
  password: "your-secure-password"
}
```

### Token Management

- JWT tokens are stored in `localStorage`
- Automatic token refresh on API calls
- Automatic logout on token expiration
- Protected routes redirect to login

---

## 📱 API Integration

### Service Architecture

The application uses a service-based architecture for API communication:

```typescript
// Example: Vehicle Service
class VehiclesService {
  async getPendingVehicles(): Promise<Vehicle[]>
  async approveVehicle(id: number): Promise<Vehicle>
  async rejectVehicle(id: number): Promise<Vehicle>
  // ... more methods
}
```

### Services Available

- **`auth.service.ts`** - Authentication and authorization
- **`vehicles.service.ts`** - Vehicle management
- **`users.service.ts`** - User management
- **`payments.service.ts`** - Payment operations
- **`analytics.service.ts`** - Analytics data
- **`activity.service.ts`** - Activity timeline
- **`api.ts`** - Base API client with interceptors

### Error Handling

All API calls include comprehensive error handling:

```typescript
try {
  const data = await vehiclesService.getPendingVehicles();
  // Handle success
} catch (error) {
  toast({
    title: "Error",
    description: error.message || "Failed to load vehicles",
    variant: "destructive",
  });
}
```

---

## 📊 Dashboard Features

### Key Metrics Displayed

1. **Platform Fee Revenue** - Total fees collected from vehicle posts
2. **Vehicles Sold** - Total number of sold vehicles
3. **Active Listings** - Currently approved vehicles
4. **Conversion Rate** - Sold/Total vehicles percentage

### Charts & Visualizations

- **Revenue Chart** - Monthly/weekly revenue trends
- **Sales by User** - Top sellers performance
- **Brand Distribution** - Market share by brand
- **Recent Activity** - Timeline of latest actions

---

## 🎨 Component Structure

### Layout Components

```
src/components/layout/
├── AdminLayout.tsx          # Main admin layout with sidebar
└── ProtectedRoute.tsx       # Route protection wrapper
```

### Feature Components

```
src/components/
├── dashboard/
│   ├── StatsCard.tsx        # KPI cards with animations
│   ├── RevenueChart.tsx     # Revenue visualization
│   ├── SalesChart.tsx       # Sales distribution
│   ├── BrandChart.tsx       # Brand pie chart
│   └── RecentActivity.tsx   # Activity timeline
├── vehicles/
│   ├── VehicleTable.tsx     # Vehicle listing table
│   └── VehicleDetailsDialog.tsx  # Vehicle detail modal
├── users/
│   ├── UserTable.tsx        # User listing table
│   └── UserDetailsDialog.tsx     # User detail modal
├── chat/
│   └── AiChatPanel.tsx      # AI assistant chatbot
└── ui/                      # shadcn/ui components
```

---

## 🎯 Page Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/login` | Login | Admin authentication |
| `/dashboard` | Dashboard | Main analytics dashboard |
| `/vehicles/pending` | PendingVehicles | Review pending submissions |
| `/vehicles/approved` | ApprovedVehicles | View approved vehicles |
| `/vehicles/rejected` | RejectedVehicles | View rejected vehicles |
| `/vehicles/sold` | SoldVehicles | View sold vehicles |
| `/payments/paid` | PaidPayments | View completed payments |
| `/users` | Users | Manage users |
| `/analytics` | Analytics | Detailed analytics |

---

## 🎨 Theming

### Color System

The application uses HSL color values for consistent theming:

```css
/* Primary Colors */
--primary: 200 98% 39%        /* Main brand color */
--secondary: 215 24% 26%      /* Secondary actions */

/* Status Colors */
--emerald-500: Success/Approved
--amber-500: Warning/Pending
--destructive: Error/Rejected
```

### Dark Mode Support

The application includes full dark mode support with automatic theme detection.

---

## 🔧 Customization

### Adding New Routes

1. Create page component in `src/pages/`
2. Add route in `src/App.tsx`
3. Update navigation in `src/components/layout/AdminLayout.tsx`

### Adding New API Services

1. Create service file in `src/services/`
2. Extend `apiService` base class
3. Add type definitions
4. Implement error handling

### Custom Components

All UI components are built with shadcn/ui and can be customized via:

```bash
npx shadcn-ui@latest add [component-name]
```

---

## 📱 Responsive Design

The admin portal is fully responsive with breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

Key responsive features:
- Collapsible sidebar on mobile
- Stacked layouts for tables
- Touch-friendly interactions
- Optimized charts for small screens

---

## 🐛 Troubleshooting

### Common Issues

**1. API Connection Failed**
```bash
# Check if backend is running
curl http://localhost:3000

# Verify VITE_API_URL in .env
```

**2. Build Errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**3. Authentication Issues**
```bash
# Clear localStorage
localStorage.clear()
# Or in browser console: localStorage.removeItem('admin_token')
```

**4. Port Already in Use**
```bash
# Change port in vite.config.ts or use different port
npm run dev -- --port 3001
```

---

## 🚀 Performance Optimization

### Built-in Optimizations

- **Code Splitting** - Automatic route-based splitting
- **Lazy Loading** - Components loaded on demand
- **Image Optimization** - Lazy image loading
- **Memoization** - React.memo for expensive components
- **Virtual Scrolling** - For long lists (tables)

### Bundle Analysis

```bash
npm run build
npm run preview
```

---

## 🔒 Security Features

- JWT token authentication
- Protected API routes
- Role-based access control
- XSS protection
- CSRF token support
- Secure credential storage
- Input sanitization

---

## 📝 Code Quality

### ESLint Configuration

The project uses strict ESLint rules for code quality:

```bash
npm run lint
```

### TypeScript Configuration

Full TypeScript support with strict mode:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": false,
    "skipLibCheck": true
  }
}
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

This project is part of the GaariHaat vehicle marketplace ecosystem.

---

## 👥 Authors

- **[MH Rabbi](https://github.com/mh-rabbi)** - Full-stack Developer

---

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [Radix UI](https://www.radix-ui.com/) - UI primitives
- [Recharts](https://recharts.org/) - Chart library
- [Lucide](https://lucide.dev/) - Icon library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework

---

## 📞 Support

For support and questions:

- **GitHub Issues**: [Create an issue](https://github.com/mh-rabbi/Admin-Portal-eCommerce-solution-for-used-car-bike/issues)
- **Documentation**: Check related repositories for API docs

---

<div align="center">

**Built with ❤️ for GaariHaat Vehicle Marketplace**

[⬆ Back to Top](#-gaari-haat-admin-portal)

</div>
