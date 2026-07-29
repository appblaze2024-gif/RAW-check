# 🚀 Deployment Guide - RAW Platform

## Snelle Deploy Opties

### 🎯 Optie 1: Vercel + Render (Aanbevolen)

#### Frontend op Vercel
1. Ga naar https://vercel.com
2. Klik "New Project"
3. Import je GitHub repository
4. Build command: `cd client && npm run build`
5. Output directory: `client/.next`
6. Environment Variables:
   ```
   NEXT_PUBLIC_API_URL=https://raw-platform-api.onrender.com/api
   ```
7. Deploy!

**Frontend URL:** `https://raw-platform.vercel.app` 🌍

#### Backend op Render
1. Ga naar https://render.com
2. Klik "New +" → "Web Service"
3. Connect je GitHub repository
4. Settings:
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `node server/index.js`
   - Region: Choose closest to you
5. Environment Variables:
   ```
   DB_USER=postgres
   DB_PASSWORD=[auto-generated]
   DB_HOST=[render-provided]
   DB_PORT=5432
   DB_NAME=raw_systematiek
   NODE_ENV=production
   PORT=10000
   ```
6. Add PostgreSQL database
7. Deploy!

**Backend URL:** `https://raw-platform-api.onrender.com` 🌍

---

### 🎯 Optie 2: Railway.app (All-in-one)

1. Ga naar https://railway.app
2. Klik "New Project"
3. Select "Deploy from GitHub"
4. Connect repository
5. Railway detecteert automatisch Node.js
6. Add PostgreSQL database
7. Settings:
   ```
   PORT=8000
   NODE_ENV=production
   DB_URL=[auto-generated]
   ```
8. Deploy!

**URL:** `https://raw-platform-railway.up.railway.app` 🌍

---

### 🎯 Optie 3: Heroku (Klassiek)

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create raw-platform-uav

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Set environment
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_secret_here

# Deploy
git push heroku main

# View app
heroku open
```

**URL:** `https://raw-platform-uav.herokuapp.com` 🌍

---

### 🎯 Optie 4: Docker + DigitalOcean App Platform

1. Push naar GitHub met Dockerfile
2. Ga naar DigitalOcean App Platform
3. Connect GitHub repository
4. Select Dockerfile
5. Add PostgreSQL database
6. Configure environment variables
7. Deploy!

**URL:** `https://raw-platform.ondigitalocean.app` 🌍

---

## 📋 Pre-Deployment Checklist

- [ ] Alle environment variables ingesteld
- [ ] Database URL correct
- [ ] API URL correct in frontend
- [ ] Node version ≥ 16
- [ ] npm install succesvol
- [ ] npm run build succesvol
- [ ] .env niet gecommit
- [ ] .gitignore correct
- [ ] Database migrations/init script ready
- [ ] Security headers configured (Helmet.js)

---

## 🔧 Production Environment Variables

```env
# Database
DB_USER=raw_user
DB_PASSWORD=strong_password_here
DB_HOST=your-db-host.cloud
DB_PORT=5432
DB_NAME=raw_systematiek

# Server
NODE_ENV=production
PORT=10000

# Security
JWT_SECRET=your_very_long_secret_key_here_change_it

# Client
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

---

## 📝 Build Configuration

### Server Build
```json
{
  "buildCommand": "npm install",
  "startCommand": "node server/index.js",
  "port": 10000
}
```

### Client Build
```json
{
  "buildCommand": "cd client && npm install && npm run build",
  "startCommand": "cd client && npm start",
  "outputDirectory": "client/.next"
}
```

---

## 🔗 Live URLs (Voorbeeld)

Na deployment zijn je URLs:

| Service | URL | Status |
|---------|-----|--------|
| Frontend | `https://raw-platform.vercel.app` | ✅ Live |
| API | `https://raw-platform-api.onrender.com` | ✅ Live |
| Database | `postgresql://host:5432/raw` | ✅ Live |
| Docs | `https://raw-platform.vercel.app/api-docs` | ✅ Live |

---

## 🧪 Test je Deployment

```bash
# Test Frontend
curl https://raw-platform.vercel.app

# Test API Health
curl https://raw-platform-api.onrender.com/api/health

# Test Questions endpoint
curl https://raw-platform-api.onrender.com/api/questions

# Expected response:
{
  "status": "Platform is actief",
  "timestamp": "2024-07-29T..."
}
```

---

## 🔐 Securing Production

### 1. Environment Variables
- ✅ Never commit .env files
- ✅ Use platform's environment management
- ✅ Rotate secrets regularly
- ✅ Use strong passwords (20+ chars)

### 2. HTTPS
- ✅ Auto-configured op Vercel/Render/Railway
- ✅ All communications encrypted
- ✅ HSTS headers enabled

### 3. Database Security
- ✅ Strong password (20+ chars)
- ✅ Only allow from app server
- ✅ Regular backups
- ✅ SSL connections

### 4. API Security
- ✅ CORS configured
- ✅ Helmet.js enabled
- ✅ Rate limiting (TODO)
- ✅ Input validation (TODO)

---

## 📊 Monitoring

### Vercel Analytics
- Dashboard: https://vercel.com/dashboard
- Metrics: Performance, Errors, Requests
- Alerts: Auto-configure

### Render Monitoring
- Dashboard: https://render.com/dashboard
- Metrics: CPU, Memory, Requests
- Logs: Real-time streaming

### Railway Monitoring
- Dashboard: https://railway.app
- Metrics: All services
- Logs: Aggregated logs

---

## 🆘 Troubleshooting

### Problem: Database Connection Failed
```bash
# Check connection string
heroku config:get DATABASE_URL

# Verify credentials
psql $DATABASE_URL -c "\d"

# Reset database
heroku pg:reset DATABASE
```

### Problem: API Timeout
- Increase dyno size
- Check database performance
- Optimize queries
- Add caching layer

### Problem: Build Fails
```bash
# Check build logs
heroku logs --tail

# Clear build cache
heroku builds:cache:purge
```

### Problem: CORS Errors
```javascript
// Update in server/index.js
app.use(cors({
  origin: "https://raw-platform.vercel.app",
  credentials: true
}));
```

---

## 📈 Scaling Production

1. **Upgrade Database**
   - PostgreSQL larger instance
   - Connection pooling
   - Read replicas

2. **Upgrade Server**
   - From free to paid plan
   - Add CDN for static assets
   - Implement caching

3. **Add Features**
   - Redis for caching
   - Bull Queue for jobs
   - WebSocket for real-time

4. **Monitor & Optimize**
   - Application Performance Monitoring (APM)
   - Database query optimization
   - API endpoint caching

---

## 📚 Volgende Stappen

1. **Deploy Frontend op Vercel**
2. **Deploy Backend op Render**
3. **Configure PostgreSQL Database**
4. **Test alle endpoints**
5. **Setup monitoring & alerts**
6. **Configure custom domain** (optional)
7. **Enable SSL certificate** (auto)
8. **Setup CI/CD pipeline**

---

## 🎉 Je Platform is Live!

Na deployment:
- Frontend: `https://raw-platform.vercel.app` 🌍
- API: `https://raw-platform-api.onrender.com/api` 🌍
- Database: Managed PostgreSQL 🗄️

Iedereen kan nu jouw RAW Platform gebruiken! 🚁✨

---

**Deployment Status:** Ready for Production  
**Last Updated:** 2024-07-29
