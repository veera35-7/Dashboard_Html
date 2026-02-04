# Setup Guide - Dashboard_Html Multi-Tenant App

## Prerequisites
- Node.js 14+ and npm
- MongoDB Atlas account (already have access with provided credentials)
- Browser with localStorage support
- Optional: VS Code with Live Server extension

---

## 🚀 Quick Setup (5 minutes)

### Step 1: Install Backend Dependencies
```bash
npm install
```

### Step 2: Start the Backend Server
```bash
npm run dev
```

You should see:
```
✅ Connected to MongoDB
🚀 Server running on http://localhost:5000
```

### Step 3: Open Frontend in Browser
- **Option A**: Double-click `Dashboard.html`
- **Option B**: Right-click → Open with Live Server (VS Code)
- **Option C**: Navigate to `file:///path/to/Dashboard.html`

### Step 4: Configure Frontend API URL
Edit `Dashboard.html` (around line 120):
```javascript
const API_URL = 'http://localhost:5000/api'; // Change from '/api'
```

### Step 5: Test the Application
1. **Sign Up**: Click "Sign Up" and create a test account
2. **Login**: Use the credentials you just created
3. **View Dashboard**: Your personalized metrics should load
4. **Admin Testing**: 
   - Go to MongoDB Atlas
   - Edit your user document
   - Change `role: "admin"`
   - Refresh page to see Admin Panel

---

## 📋 File Overview

| File | Purpose |
|------|---------|
| `Dashboard.html` | Main SPA - Frontend |
| `server.js` | Express backend - Authentication & APIs |
| `package.json` | Node dependencies |
| `.env` | MongoDB & JWT credentials |
| `.env.example` | Template (don't modify) |
| `.github/copilot-instructions.md` | AI coding guidelines |
| `README.md` | Full documentation |

---

## 🔐 Security Checklist

- [x] MongoDB credentials in `.env` (not committed)
- [ ] Change `JWT_SECRET` before production
- [ ] Add HTTPS in production
- [ ] Never share `.env` file
- [ ] Use environment-specific configs
- [ ] Enable MongoDB IP whitelist (Atlas)

---

## 🐛 Troubleshooting

### "Connection refused" when signing up
- **Problem**: Backend not running
- **Solution**: Run `npm run dev` in terminal

### Login always fails
- **Problem**: MongoDB connection issue
- **Solution**: Check `.env` file has correct `MONGODB_URI`
- Verify MongoDB Atlas cluster is accessible

### "Invalid token" on page navigation
- **Problem**: JWT mismatch between frontend/backend
- **Solution**: Ensure same `JWT_SECRET` in `.env` matches backend

### Dashboard cards show 0/empty
- **Problem**: No data loaded for user
- **Solution**: Update user data via PUT `/api/user/data` endpoint
- Or create new user - gets default values

---

## 📱 Multi-Tenant Behavior

### Regular User
- Sees only own dashboard data
- Can view Reports, Users, Payments, Settings pages
- Logout button available

### Admin User
- **All user data visible** in Admin Panel
- Can see all users' emails and roles
- Can promote/demote users (via API calls)
- Full access to all pages

---

## 🚀 Deployment

### Frontend (Vercel)
```bash
git push
# Vercel auto-deploys from GitHub
```

### Backend (Heroku)
```bash
heroku login
heroku create dashboard-api
git push heroku main
```

Set environment variables in Heroku:
```bash
heroku config:set MONGODB_URI=mongodb+srv://...
heroku config:set JWT_SECRET=your-secret
```

---

## 📞 Support

- Check `.github/copilot-instructions.md` for development patterns
- Read `README.md` for full API documentation
- Review `server.js` for backend logic
- Review `Dashboard.html` for frontend logic

---

**Ready to go! 🎉**
