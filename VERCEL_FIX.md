# ✅ Vercel Build Fix

Als je een build error in Vercel krijgt, volg deze stappen:

## 🔧 Wat is Geconfigureerd

Ik heb de volgende Vercel config files toegevoegd:

1. **vercel.json** - Build configuratie
2. **.vercelignore** - Ignore backend files
3. **client/jsconfig.json** - JavaScript config
4. **client/pages/_document.jsx** - HTML structure

## 🚀 Stap 1: Trigger Rebuild

1. Ga naar Vercel Dashboard: https://vercel.com/dashboard
2. Select je **raw-platform** project
3. Klik op de latest deployment
4. Klik "Redeploy" knop

## 🔍 Stap 2: Monitor Build

Watch de build logs:
- Build moet nu succesvol zijn
- Look for "Build Successful" message
- Wait for "Deployment Complete"

## ⚙️ Stap 3: Zet Environment Variable

Als je dit nog niet gedaan hebt:

1. Project Settings → Environment Variables
2. Voeg toe:
   ```
   NEXT_PUBLIC_API_URL = https://raw-platform-api.onrender.com/api
   ```
3. Redeploy

## 🧪 Stap 4: Test

Open: https://raw-platform.vercel.app

Je ziet:
- Homepage laden ✓
- Navigation werkt ✓
- API calls uitvoeren (na Render backend deploy) ✓

## ✅ Klaar!

Als het nog niet werkt:
1. Clear Vercel build cache
2. Delete node_modules locally
3. Commit again
4. Vercel auto-redeploys

---

**Pro Tip:** Vercel auto-rebuilds op elke git push!
