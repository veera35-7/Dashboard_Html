# Quick Reference

## 🚀 Start Backend
```bash
npm install          # First time only
npm run dev          # Starts on http://localhost:5000
```

## 🌐 Frontend
```bash
# Open in browser
file:///path/to/Dashboard.html

# Or use Live Server (VS Code)
# Right-click Dashboard.html → Open with Live Server
```

## 📝 Key Files
| File | What | Edit when |
|------|------|-----------|
| Dashboard.html | Frontend UI + JavaScript | Adding pages, styling, API calls |
| server.js | Backend APIs + MongoDB | Authentication, data endpoints |
| package.json | Dependencies | Adding npm packages |
| .env | MongoDB + JWT config | Never commit this |
| .github/copilot-instructions.md | AI guidelines | Updating development practices |

## 🔐 User Roles

| Role | Can see | Can do |
|------|---------|--------|
| user | Own dashboard | View pages, update own data |
| admin | All users data | See all users, promote/delete users |

## 🔌 API Endpoints

| Method | Endpoint | Public? | What it does |
|--------|----------|---------|-------------|
| POST | /api/auth/signup | ✅ | Create new user |
| POST | /api/auth/login | ✅ | Login, get JWT token |
| GET | /api/user/data | 🔒 | Get user's dashboard metrics |
| PUT | /api/user/data | 🔒 | Update user's metrics |
| GET | /api/admin/users | 🔒👑 | List all users (admin only) |
| GET | /api/admin/users/data | 🔒👑 | Get all data (admin only) |
| PUT | /api/admin/promote/:userId | 🔒👑 | Make user admin (admin only) |
| DELETE | /api/admin/users/:userId | 🔒👑 | Delete user (admin only) |

🔒 = Needs JWT token  
👑 = Admin role required

## 🧪 Test Accounts

### Create via UI
1. Click "Sign Up" on login page
2. Enter any email + password
3. Data saved to MongoDB

### Make Admin
1. Sign up normally
2. Open MongoDB Atlas
3. Find user document
4. Change `role: "admin"`
5. Refresh dashboard

## 🐛 Quick Fixes

| Problem | Solution |
|---------|----------|
| "Cannot POST /api/auth/login" | Backend not running - `npm run dev` |
| Login fails | Check .env MongoDB URI is correct |
| Admin panel not showing | User role not set to "admin" in MongoDB |
| Cards show 0 | Create user data via PUT /api/user/data |
| localStorage fallback | Backend not running, using demo mode |

## 📱 Multi-tenant Behavior

- Each user sees **only their own** dashboard data
- Admins see **all users** and their data
- Logout clears localStorage JWT token
- Refresh page with valid token = auto-login

## 🔐 Credentials (in .env)

```
MongoDB: mongodb+srv://212cs032:tfsur2a0AN2UeMKt@cluster0.xem3i9f.mongodb.net/dashboard
JWT Secret: (change this in production!)
```

## 📚 Documentation Files

- **README.md** - Full guide + API reference
- **SETUP.md** - Step-by-step setup + troubleshooting
- **IMPLEMENTATION.md** - Architecture overview + testing
- **MIGRATE.md** - Database schema changes
- **.github/copilot-instructions.md** - AI coding patterns

## 🎯 Common Tasks

### Add new navigation page
1. Add sidebar link: `<a onclick="showPage('newpage')">New Page</a>`
2. Add page div: `<div id="newpage" class="page">...</div>`
3. Add CSS styling if needed

### Add admin feature
1. Check `currentUser.role === 'admin'` in JavaScript
2. Show/hide element: `if (admin) { element.style.display = 'block' }`
3. Call admin API: `/api/admin/...`

### Change card data
Update `updateDashboardData()` function in Dashboard.html

### Add user field
1. Update schema in server.js
2. Add to form in Dashboard.html
3. Send in POST /api/auth/signup
4. Update documentation

## 🚀 Deployment Checklist

- [ ] Change JWT_SECRET in .env
- [ ] Set MONGODB_URI to production cluster
- [ ] Enable HTTPS
- [ ] Add IP whitelist in MongoDB Atlas
- [ ] Set NODE_ENV=production
- [ ] Enable rate limiting
- [ ] Add error logging
- [ ] Test all flows in production

---

**Need more help?** See README.md or SETUP.md
