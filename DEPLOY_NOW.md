# 🚀 Deploy Nu - Stap-voor-Stap

## ⚡ Snelste Optie (5 minuten)

### Stap 1: Frontend Deployen op Vercel

1. Ga naar https://vercel.com/new
2. Click "Import Git Repository"
3. Paste je GitHub URL:
   ```
   https://github.com/yourusername/RAW-check
   ```
4. Klik "Import"
5. Vercel detecteert automatisch:
   - Framework Preset: Next.js
   - Root Directory: `client`
6. Voeg Environment Variable toe:
   ```
   NEXT_PUBLIC_API_URL = https://raw-platform-api.onrender.com/api
   ```
7. Klik "Deploy"

⏳ Wacht 2-3 minuten...

**Frontend is nu LIVE!** ✅
```
https://raw-platform.vercel.app
```

---

### Stap 2: Backend Deployen op Render

1. Ga naar https://render.com/register
2. Sign up / Login
3. Klik "+ New" → "Web Service"
4. Select "Deploy existing code"
5. Connect je GitHub repository
6. Configuratie:
   ```
   Name: raw-platform-api
   Environment: Node
   Region: Pick closest (Europe/US)
   Build Command: npm install
   Start Command: node server/index.js
   Plan: Free
   ```
7. Klik "Create Web Service"
8. Wacht tot build compleet is
9. Copy de URL (bijv: raw-platform-api.onrender.com)

⏳ Wacht 3-5 minuten...

**Backend is nu LIVE!** ✅
```
https://raw-platform-api.onrender.com
```

---

### Stap 3: Database Toevoegen

1. In Render dashboard
2. Klik "+ New" → "PostgreSQL"
3. Configuratie:
   ```
   Name: raw-db
   Database: raw_systematiek
   Plan: Free
   Region: Same as Web Service
   ```
4. Klik "Create Database"
5. Copy connection details

---

### Stap 4: Database Verbinden met Backend

1. In Render Web Service
2. Klik "Environment"
3. Voeg toe:
   ```
   DB_HOST=your-db-host.onrender.com
   DB_USER=raw_user
   DB_PASSWORD=generated_password
   DB_NAME=raw_systematiek
   DB_PORT=5432
   NODE_ENV=production
   PORT=10000
   ```
4. Klik "Save"
5. Service restart automatisch

---

### Stap 5: Initialiseer Database

1. In Render, ga naar Logs
2. Voer command uit:
   ```bash
   npm run db:init
   ```
3. Of via curl:
   ```bash
   curl https://raw-platform-api.onrender.com/api/health
   ```

---

## ✅ Je Platform is NU Live!

| Component | URL | Status |
|-----------|-----|--------|
| **Frontend** | https://raw-platform.vercel.app | 🟢 Live |
| **API** | https://raw-platform-api.onrender.com/api | 🟢 Live |
| **Database** | PostgreSQL on Render | 🟢 Live |

---

## 🧪 Test je Deployment

### 1. Frontend Testen
```bash
curl https://raw-platform.vercel.app
```
Je ziet de homepage met navigatie ✓

### 2. API Health Check
```bash
curl https://raw-platform-api.onrender.com/api/health
```
Response:
```json
{
  "status": "Platform is actief",
  "timestamp": "2024-07-29T..."
}
```

### 3. Test Questions Endpoint
```bash
curl https://raw-platform-api.onrender.com/api/questions
```
Response: `[]` (empty array is fine)

### 4. Test UAV Database
```bash
curl https://raw-platform-api.onrender.com/api/uav
```
Response: `[]`

---

## 🔗 Delen met Anderen

Nu kan je je platform linken:

```
🌍 RAW Platform: https://raw-platform.vercel.app
API: https://raw-platform-api.onrender.com/api
```

Iedereen kan het gebruiken!

---

## 📊 Live URLs Referentie

### Frontend (Vercel)
- Homepage: https://raw-platform.vercel.app
- Vragen: https://raw-platform.vercel.app/questions
- UAV DB: https://raw-platform.vercel.app/uav
- Knowledge: https://raw-platform.vercel.app/knowledge-base
- Compliance: https://raw-platform.vercel.app/compliance
- Forum: https://raw-platform.vercel.app/forum
- Checklists: https://raw-platform.vercel.app/checklists

### Backend API (Render)
- Health: https://raw-platform-api.onrender.com/api/health
- Questions: https://raw-platform-api.onrender.com/api/questions
- UAV: https://raw-platform-api.onrender.com/api/uav
- Knowledge: https://raw-platform-api.onrender.com/api/systematiek/knowledge-base
- Compliance: https://raw-platform-api.onrender.com/api/systematiek/compliance
- Users: https://raw-platform-api.onrender.com/api/users
- Reports: https://raw-platform-api.onrender.com/api/reports

---

## 🎯 Volgende Stappen (Optional)

### Custom Domain (€10-15/jaar)
1. Koop domain (GoDaddy, Namecheap)
2. Vercel: Project Settings → Domains → Add
3. Add DNS records

### Custom Email
1. Configureer SMTP
2. Stuur notificaties vanuit app

### Monitoring
1. Vercel Analytics Auto-enabled
2. Render Metrics Dashboard
3. PostgreSQL Backups

### CI/CD
1. GitHub Actions automatisch
2. Deploy on push

---

## ⚠️ Important Notes

- ✅ Free tier Render sleeps after 15 min inactivity (cold start)
- ✅ Free tier database has limitations
- ✅ Upgrade anytime naar paid plans
- ✅ Data persists op Render PostgreSQL

---

## 🎉 Proficiat!

Je RAW Platform draait nu op:
```
Frontend: https://raw-platform.vercel.app 🌍
Backend:  https://raw-platform-api.onrender.com 🌍
```

**Deel deze URLs met je team!** 🚁✨

---

**Deployment Time:** 5-10 minuten  
**Cost:** FREE 🎉  
**Status:** PRODUCTION READY ✅
