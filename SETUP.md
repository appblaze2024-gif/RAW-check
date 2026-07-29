# Setup en Configuratie Handleiding

## 🔧 Stap-voor-stap Installatie

### Stap 1: Vereisten Controleren

Zorg dat je het volgende hebt geïnstalleerd:

```bash
# Node.js versie controleren
node --version  # v16.0.0 of hoger

# npm versie controleren
npm --version   # 7.0.0 of hoger

# PostgreSQL installeren (als niet geïnstalleerd)
# macOS:
brew install postgresql

# Linux (Ubuntu):
sudo apt-get install postgresql postgresql-contrib

# Windows:
# Download van https://www.postgresql.org/download/windows/
```

### Stap 2: PostgreSQL Database Aanmaken

```bash
# Connect met PostgreSQL
psql -U postgres

# Maak een nieuwe database aan
CREATE DATABASE raw_systematiek;

# Maak een gebruiker aan (optioneel)
CREATE USER raw_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE raw_systematiek TO raw_user;

# Uitgang
\q
```

### Stap 3: Repository Clonen en Dependencies Installeren

```bash
# Clone de repository
git clone https://github.com/yourusername/RAW-check.git
cd RAW-check

# Installeer root dependencies
npm install

# Installeer client dependencies
cd client
npm install
cd ..

# Installeer server dependencies (als separate)
cd server
npm install
cd ..
```

### Stap 4: Environment Variabelen Configureren

```bash
# Kopieer het voorbeeld bestand
cp .env.example .env

# Edit .env met je instellingen
nano .env
```

#### .env Inhoud Voorbeeld:

```env
# Database
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=raw_systematiek

# Server
PORT=5000
NODE_ENV=development

# Client API
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# JWT (voor authenticatie)
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production

# Email (optioneel voor notificaties)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### Stap 5: Database Initialiseren

```bash
# Dit maakt alle tabellen aan
npm run db:init
```

Na het uitvoeren zie je:
```
📦 Database initialiseren...
✅ Database succesvol geïnitialiseerd
```

### Stap 6: Development Servers Starten

```bash
# Start zowel frontend als backend
npm run dev
```

Dit start:
- **Frontend** op `http://localhost:3000`
- **Backend** op `http://localhost:5000`

Controleer of alles werkt door naar deze URLs te gaan.

### Stap 7: Test Data Toevoegen (Optioneel)

```bash
# Voeg wat test data toe
node server/scripts/seedData.js
```

## 📦 Production Setup

### Build voor Production

```bash
# Build de frontend
npm run build

# Start in production mode
NODE_ENV=production npm start
```

### Deployment op Server

1. **SSH in je server**
```bash
ssh user@your-server.com
```

2. **Clone en setup**
```bash
git clone https://github.com/yourusername/RAW-check.git
cd RAW-check
npm install
```

3. **Configure .env voor production**
```bash
nano .env
```

4. **Build**
```bash
npm run build
```

5. **Gebruik PM2 voor process management**
```bash
npm install -g pm2
pm2 start npm --name "raw-platform" -- start
pm2 save
pm2 startup
```

6. **Configure Nginx (reverse proxy)**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 🧪 Testing

### Backend Tests Uitvoeren

```bash
cd server
npm test
```

### Frontend Tests Uitvoeren

```bash
cd client
npm test
```

## 🔍 Troubleshooting

### Problem: "Cannot connect to database"

**Oplossing:**
```bash
# Controleer PostgreSQL status
sudo systemctl status postgresql

# Start PostgreSQL
sudo systemctl start postgresql

# Controleer .env instellingen
cat .env | grep DB_
```

### Problem: "Port already in use"

**Oplossing:**
```bash
# Verander de PORT in .env
echo "PORT=5001" >> .env

# Of kill het process dat de poort gebruikt
lsof -i :5000
kill -9 <PID>
```

### Problem: "Cannot find module"

**Oplossing:**
```bash
# Verwijder node_modules en package-lock
rm -rf node_modules package-lock.json

# Reinstalleer
npm install
```

### Problem: "Database not initialized"

**Oplossing:**
```bash
# Run initialization script
npm run db:init
```

## 📊 Database Backups

### Automatische Backup Maken

```bash
# Backup database
pg_dump -U postgres raw_systematiek > backup_$(date +%Y%m%d).sql

# Restore database
psql -U postgres raw_systematiek < backup_20240729.sql
```

## 🔐 Security Checklist

Voor Production:

- [ ] Change JWT_SECRET in .env
- [ ] Use strong database passwords
- [ ] Enable HTTPS
- [ ] Configure CORS properly
- [ ] Set NODE_ENV=production
- [ ] Use environment variables for all secrets
- [ ] Enable database backups
- [ ] Configure firewall rules
- [ ] Use strong usernames/passwords
- [ ] Enable audit logging

## 📚 Volgende Stappen

1. **Gebruikers aanmaken**: Admin panel gebruiken
2. **Initial Data Toevoegen**: UAV models, Knowledge base artikelen
3. **Customize**: Branding, logo, kleuren
4. **Test**: Alle features doorlopen
5. **Deploy**: Naar production server

## 🆘 Help Nodig?

- Lees de README.md voor overzicht
- Check API.md voor API documentatie
- Kijk naar server/routes/ voor code voorbeelden
- Open GitHub Issue voor bugs

---

Veel plezier met het RAW Platform! 🚁
