# 🔥 Firebase Auto-Deploy Setup

## ✅ Automatisch Deploy (GitHub Actions)

Zodra je pusht naar GitHub, deployt het automatisch naar Firebase!

### Setup (Eenmalig):

1. **Ga naar Firebase Console:**
   https://console.firebase.google.com/project/raw-check/settings/serviceaccounts/adminsdk

2. **Genereer New Private Key:**
   - Klik "Generate New Private Key"
   - Sla JSON bestand op

3. **Voeg Secret Toe aan GitHub:**
   - Ga naar GitHub repo → Settings → Secrets and variables → Actions
   - Klik "New repository secret"
   - Name: `FIREBASE_SERVICE_ACCOUNT`
   - Value: (Paste hele JSON inhoud van private key)
   - Klik "Add secret"

### 🚀 Auto-Deploy:

Nu werkt het automatisch:
```bash
git push origin claude/raw-systematiek-uav-platform-sk0n7q
```

GitHub Actions:
1. Bouwt de app
2. Deployt naar Firebase
3. ✅ Website live op https://raw-check.web.app

Check status:
- Ga naar repo → Actions tab
- Kijk naar "Deploy to Firebase Hosting"

---

## 🛠️ Handmatig Deploy (Alternatief)

Als GitHub Actions niet werkt, deploy handmatig:

### Setup (Eenmalig):

```bash
npm install -g firebase-tools
firebase login
```

### Deploy:

```bash
chmod +x deploy.sh
./deploy.sh
```

Of direct:
```bash
firebase deploy --only hosting
```

---

## 📊 Deploy Status

Check je deployment:
- **Live URL:** https://raw-check.web.app
- **Console:** https://console.firebase.google.com/project/raw-check
- **Logs:** GitHub Actions tab in je repo

---

## 🆘 Troubleshooting

### "Failed to authenticate"
```bash
firebase login
```

### "Build failed"
```bash
cd client
npm install
npm run build
```

### "Permission denied" on deploy.sh
```bash
chmod +x deploy.sh
```

---

**Je website is nu LIVE-ready!** 🚀
