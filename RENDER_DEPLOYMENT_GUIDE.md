# DYMUN Render.com Deployment Guide

## Security Best Practices

### ⚠️ IMPORTANT: Never Store User Data in Environment Variables

**DO NOT** store your 209 user records (or any user database) in environment variables or secret files. This is:
- Not scalable
- Not secure
- Not maintainable
- Not how production applications work

### Proper User Data Storage

Your user data should be stored in a **database**, not in environment variables. Here are your options:

#### Option 1: Use Render PostgreSQL Database (Recommended)
1. Go to your Render Dashboard
2. Click "New +" → "PostgreSQL"
3. Choose a name (e.g., `dymun-database`)
4. Select a region close to your users
5. Choose a plan (Free tier available)
6. Click "Create Database"

Once created, Render will provide you with a `DATABASE_URL`. This URL contains all the connection information.

#### Option 2: Use Replit's Built-in PostgreSQL
If you're developing on Replit, you already have PostgreSQL available. The connection details are in your environment variables.

## Environment Variables for Render.com

### Required Environment Variables

Add these environment variables in your Render.com service settings:

```
NODE_ENV=production
SESSION_SECRET=<generate-a-random-secret-key>
DATABASE_URL=<your-postgresql-database-url>
```

### How to Add Environment Variables on Render.com

1. **Go to your Render Dashboard**
   - Navigate to https://dashboard.render.com

2. **Select Your Web Service**
   - Click on your deployed DYMUN application

3. **Go to Environment Tab**
   - Click "Environment" in the left sidebar

4. **Add Environment Variables**
   - Click "Add Environment Variable"
   - Add each variable:
     - Key: `SESSION_SECRET`
     - Value: Generate a random string (at least 32 characters)
       - You can generate one here: https://www.random.org/strings/
       - Or use: `openssl rand -base64 32` in terminal
     
     - Key: `DATABASE_URL` (if using external database)
     - Value: Your PostgreSQL connection string
       - Format: `postgresql://username:password@host:port/database`

5. **Save Changes**
   - Click "Save Changes"
   - Your service will automatically redeploy

## Migrating Your 209 Users to the Database

### Step 1: Prepare Your User Data

Create a CSV or JSON file with your user data:

```json
[
  {
    "idNumber": "DY001",
    "gmail": "user1@school.com",
    "password": "temporaryPassword123",
    "committee": "UNHRC",
    "institution": "Delhi Public School"
  },
  {
    "idNumber": "DY002",
    "gmail": "user2@school.com",
    "password": "temporaryPassword123",
    "committee": "UNSC",
    "institution": "Modern School"
  }
  // ... rest of your 209 users
]
```

### Step 2: Update Storage to Use Database

Currently, the app uses in-memory storage (`MemStorage`). To use a real database:

1. **The schema is already set up** in `shared/schema.ts`
2. **Create a database storage implementation** that uses PostgreSQL
3. **Run migrations** to create the tables
4. **Import your users** using a seed script

### Step 3: Create a Seed Script

Create a file `server/seed.ts`:

```typescript
import { storage } from "./storage";
import usersData from "./users-data.json";

async function seedUsers() {
  for (const userData of usersData) {
    await storage.createUser(userData);
  }
  console.log(`Seeded ${usersData.length} users`);
}

seedUsers().catch(console.error);
```

Run it once: `npm run seed` (add script to package.json)

## Security Checklist

- ✅ User passwords are hashed with bcrypt (already implemented)
- ✅ Session secrets are environment variables (configured above)
- ✅ User data is in a database, not environment variables
- ✅ HTTPS is enabled (Render provides this automatically)
- ✅ Sessions are httpOnly cookies (already configured)
- ⚠️ Before production: Change all user passwords from placeholders
- ⚠️ Before production: Set up email verification
- ⚠️ Before production: Add rate limiting to prevent brute force attacks

## Deployment Steps on Render.com

### 1. Connect Your Repository

1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub/GitLab repository
4. Select the DYMUN repository

### 2. Configure Build Settings

- **Name**: `dymun` (or your preferred name)
- **Environment**: `Node`
- **Region**: Choose closest to your users
- **Branch**: `main` (or your default branch)
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

### 3. Configure Environment Variables

Add the environment variables listed above in the "Environment" section.

### 4. Choose Your Plan

- **Free**: Good for testing (spins down after inactivity)
- **Starter ($7/month)**: Always on, better performance
- **Standard ($25/month)**: Production-ready with autoscaling

### 5. Deploy

Click "Create Web Service" and Render will:
1. Clone your repository
2. Install dependencies
3. Build your application
4. Start the server
5. Provide you with a URL (e.g., `https://dymun.onrender.com`)

## Post-Deployment

### Update Your Users

1. **Send credentials to all 209 users**
   - Email them their ID number and temporary password
   - Ask them to change their password on first login

2. **Add password reset functionality** (future enhancement)

3. **Monitor your application**
   - Check Render logs for errors
   - Monitor database usage
   - Set up alerts for downtime

## Troubleshooting

### Sessions Not Persisting
- Ensure `SESSION_SECRET` is set
- Check that cookies are enabled
- Verify HTTPS is working

### Database Connection Errors
- Verify `DATABASE_URL` is correct
- Check database is running
- Ensure firewall allows connections from Render

### Users Can't Log In
- Verify passwords are hashed correctly
- Check database has user records
- Look at server logs for authentication errors

## Alternative: Keep In-Memory Storage (Not Recommended for Production)

If you want to continue with in-memory storage (only for testing):

⚠️ **WARNING**: All data will be lost when the server restarts!

You would need to:
1. Keep the user data in the `seedUsers()` function in `server/storage.ts`
2. Accept that data resets on every deployment
3. Plan to migrate to a database before going live

This is NOT suitable for production use.

## Need Help?

- Render Documentation: https://render.com/docs
- PostgreSQL on Render: https://render.com/docs/databases
- Environment Variables: https://render.com/docs/environment-variables
