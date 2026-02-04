# Database Migration Guide

This document outlines how to modify the MongoDB schema and migrate data.

## Current Schema (v1.0)

```javascript
User {
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
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

## How to Add Fields

### Example: Add phone number field

1. **Update Mongoose Schema** (server.js)
```javascript
const userSchema = new mongoose.Schema({
    // ... existing fields ...
    phone: { type: String, default: null },  // New field
});
```

2. **Create Migration Script** (optional but recommended)
```bash
node migrations/addPhoneField.js
```

3. **Update Frontend** (Dashboard.html)
- Add phone input in signup form
- Send phone in POST `/api/auth/signup`

### Example: Add email verification

1. **Update Schema**
```javascript
const userSchema = new mongoose.Schema({
    // ... existing fields ...
    verified: { type: Boolean, default: false },
    verificationToken: { type: String, default: null },
    verificationExpires: { type: Date, default: null }
});
```

2. **Add Backend Routes**
```javascript
POST /api/auth/send-verification   // Sends email
POST /api/auth/verify-email        // Verifies token
```

3. **Update Frontend**
- Show verification page after signup
- Check `verified` status before allowing dashboard

## Migration Checklist

When adding a new field:
- [ ] Update MongoDB schema in server.js
- [ ] Add migration script if needed
- [ ] Test with old documents (ensure defaults work)
- [ ] Update frontend form/display
- [ ] Update API documentation
- [ ] Test end-to-end flow
- [ ] Update `.github/copilot-instructions.md`

## Rollback Procedure

If a migration fails:

1. **Backup your MongoDB data** (in Atlas: Backup & Restore)
2. **Revert code changes** from git
3. **Restart backend** with previous schema
4. **Clear browser localStorage** if needed

## Common Tasks

### View all users
```bash
mongo "mongodb+srv://212cs032:tfsur2a0AN2UeMKt@cluster0.xem3i9f.mongodb.net/dashboard"
db.users.find()
```

### Delete a user
```bash
db.users.deleteOne({ email: "user@example.com" })
```

### Update user role
```bash
db.users.updateOne(
    { email: "user@example.com" },
    { $set: { role: "admin" } }
)
```

### Clear all data (development only!)
```bash
db.users.deleteMany({})
```

## Connecting to MongoDB Compass

For visual database management:

1. Download [MongoDB Compass](https://www.mongodb.com/products/tools/compass)
2. Connection String:
   ```
   mongodb+srv://212cs032:tfsur2a0AN2UeMKt@cluster0.xem3i9f.mongodb.net/dashboard
   ```
3. Connect and browse collections

## Future Schema Considerations

Potential fields to add:
- `profile.firstName`, `profile.lastName`
- `profile.avatar` (URL)
- `lastLogin` (Date)
- `loginHistory` (Array of dates)
- `preferences` (Object for user settings)
- `twoFactorEnabled` (Boolean)
- `apiKey` (String for API access)
- `subscription` (Object with plan, expiry)

## Notes

- Always backup before major migrations
- Test migrations on a clone database first
- Document schema changes in this file
- Keep server.js schema and README.md in sync
