# Dashboard_Html - Multi-Tenant Application

A responsive single-page dashboard application with **multi-tenant support**, **user authentication**, and **MongoDB integration**.

## Features

✅ **Multi-Tenant Architecture** - Each user sees only their own data  
✅ **User Authentication** - Secure login/signup with JWT tokens  
✅ **Admin Dashboard** - Admins see all users and their data  
✅ **MongoDB Integration** - Persistent data storage  
✅ **Responsive Design** - Works on desktop and mobile  
✅ **Role-Based Access Control** - User vs Admin roles  

## Quick Start

### Frontend Setup (Local Development)

```bash
# Option 1: Open directly in browser
open Dashboard.html

# Option 2: Use Live Server (VS Code extension)
# Right-click Dashboard.html > Open with Live Server
```

### Backend Setup (with MongoDB)

```bash
# 1. Install dependencies
npm install

# 2. Create .env file (already provided with MongoDB URI)
# Ensure .env contains:
MONGODB_URI=mongodb+srv://212cs032:tfsur2a0AN2UeMKt@cluster0.xem3i9f.mongodb.net/dashboard
JWT_SECRET=your-secret-key

# 3. Start server
npm run dev

# Server runs on http://localhost:5000
```

### Connect Frontend to Backend

Update `Dashboard.html` to use the backend API:

```javascript
// In Dashboard.html, line ~120:
const API_URL = 'http://localhost:5000/api'; // Change from '/api'
```

For production (Vercel), set up a proxy or deploy backend separately.

## User Flows

### Regular User
1. Sign Up with email/password
2. Login to dashboard
3. View personalized metrics (Total Users, Revenue, Courses, Tasks)
4. Navigate between pages (Dashboard, Users, Reports, Payments, Settings)
5. Logout

### Admin User
1. Login with admin credentials
2. Dashboard shows admin panel with all users table
3. Can promote/delete users via API
4. Can view all users' data

## Database Schema

### User Collection
```javascript
{
  email: String (unique),
  password: String (bcrypt hashed),
  role: String ('user' | 'admin'),
  createdAt: Date,
  dashboardData: {
    totalUsers: Number,
    revenue: Number,
    activeCourses: Number,
    pendingTasks: Number
  }
}
```

## API Endpoints

### Public Routes
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login (returns JWT token)

### Protected Routes (User)
- `GET /api/user/data` - Get user's dashboard metrics
- `PUT /api/user/data` - Update user's metrics

### Protected Routes (Admin Only)
- `GET /api/admin/users` - List all users
- `GET /api/admin/users/data` - Get all users' full data
- `PUT /api/admin/promote/:userId` - Promote user to admin
- `DELETE /api/admin/users/:userId` - Delete user

## Development

### Tech Stack
- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Backend**: Node.js, Express
- **Database**: MongoDB Atlas
- **Auth**: JWT (JSON Web Tokens) + bcryptjs

### Project Structure
```
.
├── Dashboard.html          # Main SPA
├── LearnHtml.html          # Educational reference
├── server.js               # Express server
├── package.json            # Dependencies
├── .env                    # Environment variables
├── vercel.json             # Vercel config
└── .github/
    └── copilot-instructions.md
```

## Deployment

### Frontend (Vercel)
```bash
# Push to GitHub and connect to Vercel
# Auto-deploys on push
```

### Backend Options
1. **Vercel Serverless Functions** - Deploy as API routes
2. **Heroku** - `git push heroku main`
3. **AWS Lambda** - Package and upload
4. **Railway/Render** - Connect GitHub repo

### Environment Variables (Production)
```
MONGODB_URI=mongodb+srv://[user]:[pass]@[cluster]/database
JWT_SECRET=strong-random-secret-key
NODE_ENV=production
```

## Demo Accounts

Since backend is optional for testing, the app uses localStorage fallback:

**To test with backend:**
1. Create new account via Sign Up
2. Admin testing: Manually set `role: 'admin'` in MongoDB

**Local testing (no backend):**
- Sign up and login with any email/password (stored in localStorage)

## Security Notes ⚠️

1. **Never commit `.env`** with real credentials
2. **Change JWT_SECRET** in production
3. **Use HTTPS** in production
4. **Implement rate limiting** on auth endpoints
5. **Validate all inputs** on backend
6. **Use environment-specific configs** (dev/staging/prod)

## Next Steps

- [ ] Add email verification
- [ ] Implement password reset
- [ ] Add 2FA (Two-Factor Authentication)
- [ ] Create user profile editing page
- [ ] Add data export (CSV/PDF)
- [ ] Implement audit logging
- [ ] Add API rate limiting

## Support

For issues or questions, check the `.github/copilot-instructions.md` for development guidelines.

---

**Built with ❤️ | Dashboard_Html 2026**