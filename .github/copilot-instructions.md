# AI Coding Guidelines for Dashboard_Html

## Project Overview
Single-page dashboard application built with vanilla HTML/CSS/JavaScript. Deployed on Vercel. The project demonstrates responsive UI patterns with sidebar navigation and page-switching functionality.

## Architecture & Key Files

### Main Structure
- **[Dashboard.html](../Dashboard.html)** - Primary SPA with embedded styles and navigation logic
- **[LearnHtml.html](../LearnHtml.html)** - Educational reference page (linked from Reports)
- **[vercel.json](../vercel.json)** - Routing config: root path `/` maps to `/Dashboard.html`

### Core Pattern: SPA Navigation
The dashboard uses a **page visibility toggle pattern** (not routing):
```javascript
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}
```
- Each page (`#dashboard`, `#users`, `#reports`, `#payments`, `#settings`) is hidden/shown via `.active` class
- Sidebar links trigger `onclick="showPage('pageId')"` (avoid changing this pattern to onclick attributes)
- Title updates dynamically: `pageTitle.innerText = pageId.charAt(0).toUpperCase() + pageId.slice(1)`

## CSS Organization
All styles are embedded in `<style>` tag. Key layout components:
- **Sidebar** (220px fixed width, dark theme #1e293b) + **Main** (flex: 1) create two-column layout
- **Cards grid**: `grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))` for responsive card layout
- **Active state handling**: `.active` class toggles page/link visibility

## Developer Workflows

### Local Development - Frontend
- Open `Dashboard.html` directly in browser (or use Live Server extension)
- No build step required for frontend; edit HTML/CSS/JS directly

### Local Development - Backend (Multi-tenant with MongoDB)
1. Install dependencies: `npm install`
2. Set up `.env` file with MongoDB URI and JWT_SECRET
3. Start server: `npm run dev` (uses nodemon for auto-reload)
4. Backend runs on `http://localhost:5000`
5. Frontend API calls target `/api` endpoints (configure proxy in package.json for dev)

### Deployment
- **Frontend**: Vercel hosts the static SPA; routes configured in `vercel.json`
- **Backend**: Deploy Node.js server to Vercel, Heroku, or AWS
- For Vercel deployment of backend: Use `vercel.json` routes or serverless functions
- MongoDB Atlas connection string in `.env` (never commit credentials)

## Conventions & Patterns

1. **Page Management**: Use `showPage(pageId)` for navigation; keep pages inside `<div id="pageId" class="page">` structure
2. **Sidebar Links**: New navigation items should follow: `<a class="nav-link" onclick="showPage('newPageId')">Label</a>`
3. **Styling**: Add CSS to existing `<style>` block; follow the dark sidebar / light main theme
4. **Authentication**: Users stored in MongoDB with bcrypt hashing; JWT tokens for session management
5. **Multi-tenancy**: Each user sees only their data via `loadUserData()` filtering by userId
6. **Admin Panel**: Only users with `role: 'admin'` see `#adminPanel` showing all users and their data
7. **API Communication**: Frontend uses `fetch()` to `/api/*` endpoints with JWT in Authorization header
8. *MongoDB**: User data persisted in Atlas cluster; connection in `server.js`
- **JWT Authentication**: `handleAuth()` saves token to localStorage; `verifyToken()` middleware validates backend requests
- **Admin Endpoints**: `/api/admin/users` returns all users; `/api/admin/promote/:userId` changes roles; `/api/admin/users/:userId` deletes users
- **User Endpoints**: `/api/user/data` GET/PUT for individual dashboard metrics
- **LearnHtml.html**: Referenced from Reports page footer; independent educational resource

## Backend API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user (role defaults to 'user')
- `POST /api/auth/login` - Login, returns JWT token

### User Routes (requires token)
- `GET /api/user/data` - Fetch user's dashboard metrics
- `PUT /api/user/data` - Update user's dashboard metrics

### Admin Routes (requires token + admin role)
- `GET /api/admin/users` - List all users (email, role, createdAt)
- `GET /api/admin/users/data` - Get all users' full data
- `PUT /api/admin/promote/:userId` - Promote user to admin
- `DELETE /api/admin/users/:userId` - Delete user account

## File Structure
```
.
├── Dashboard.html       # SPA with login, navigation, multi-tenant pages
├── LearnHtml.html       # Educational reference
├── server.js            # Express backend with MongoDB integration
├── package.json         # Node dependencies (express, mongoose, jwt, bcrypt)
├── .env                 # MongoDB URI & JWT secret (never commit)
├── vercel.json          # Vercel routing
└── .github/copilot-instructions.md
```

## Future Considerations
- Extract page-switching logic to separate JS file if app grows
- Implement real-time data updates with WebSockets for admin panel
- Add user profile management and email verification
- Implement role-based menu (hide certain nav items for non-admins)ples in dashboard cards

## Future Considerations
- Consider extracting page-switching logic to separate JS file if app grows
- Dashboard card data should be data-driven rather than hardcoded
