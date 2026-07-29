# RAW Systematiek UAV Platform

🚀 Een uitgebreid platform voor het beheren van alle UAV en RAW (Remote Aerial Vehicle) vraagstukken met focus op regelgeving, kennisuitwisseling en community support.

## 📋 Overzicht

Dit platform biedt een alles-in-één oplossing voor professionals die werken met UAV's in het kader van RAW (Remote Aerial Work) operaties. Het systeem integreert:

- **RAW Vragencentrum**: Stel vragen en ontvang antwoorden van experts
- **UAV Database**: Uitgebreide database met UAV specificaties
- **Knowledge Base**: Gecontroleerde informatie over RAW systematiek
- **Checklists**: Downloadbare checklists voor operaties
- **Compliance Management**: Regelgeving per jurisdictie
- **Community Forum**: Discussie met andere professionals
- **Rapport Generatie**: Automatische rapporten aanmaken

## 🏗️ Architectuur

```
RAW-check/
├── server/                          # Backend (Express.js)
│   ├── config/
│   │   └── database.js             # Database configuratie
│   ├── routes/
│   │   ├── questions.js            # RAW vragen API
│   │   ├── uav.js                  # UAV database API
│   │   ├── systematiek.js          # Knowledge base API
│   │   ├── users.js                # Gebruikers API
│   │   └── reports.js              # Rapporten API
│   └── scripts/
│       └── initDb.js               # Database initialisatie
│
├── client/                          # Frontend (Next.js/React)
│   ├── pages/
│   │   ├── index.jsx               # Homepage
│   │   ├── questions/              # Vragen pagina
│   │   ├── uav/                    # UAV database pagina
│   │   ├── knowledge-base/         # Knowledge base pagina
│   │   ├── checklists/             # Checklists pagina
│   │   ├── compliance/             # Compliance pagina
│   │   └── forum/                  # Forum pagina
│   ├── components/
│   │   └── Layout.jsx              # Hoofd layout
│   └── styles/
│       └── globals.css             # Global styles
│
├── package.json                     # Root dependencies
└── .env.example                     # Environment template
```

## 📊 Database Schema

### Hoofdtabellen:

1. **users** - Gebruikersgegevens
2. **raw_questions** - RAW gerelateerde vragen
3. **uav_specs** - UAV specificaties
4. **raw_knowledge_base** - Knowledge base artikelen
5. **raw_checklists** - Checklists en templates
6. **compliance_regulations** - Regelgeving informatie
7. **forum_threads** - Forum discussieonderwerpen
8. **forum_replies** - Forum antwoorden
9. **reports** - Gegenereerde rapporten

## 🚀 Aan de Slag

### Vereisten

- Node.js >= 16.0.0
- PostgreSQL >= 12
- npm of yarn

### Installatie

1. **Clone de repository**
```bash
git clone https://github.com/yourusername/RAW-check.git
cd RAW-check
```

2. **Installeer dependencies**
```bash
npm install
```

3. **Configureer omgevingsvariabelen**
```bash
cp .env.example .env
# Edit .env met jouw database gegevens
```

4. **Initialiseer database**
```bash
npm run db:init
```

5. **Start development servers**
```bash
npm run dev
```

De applicatie is nu beschikbaar op:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

## 📚 API Endpoints

### RAW Vragen
- `GET /api/questions` - Alle vragen ophalen
- `POST /api/questions` - Nieuwe vraag aanmaken
- `GET /api/questions/:id` - Specifieke vraag ophalen
- `PUT /api/questions/:id` - Vraag bijwerken
- `DELETE /api/questions/:id` - Vraag verwijderen

### UAV Database
- `GET /api/uav` - Alle UAV's ophalen
- `POST /api/uav` - Nieuw UAV toevoegen
- `GET /api/uav/:id` - Specifiek UAV ophalen
- `PUT /api/uav/:id` - UAV bijwerken

### Knowledge Base
- `GET /api/systematiek/knowledge-base` - Alle artikelen
- `POST /api/systematiek/knowledge-base` - Nieuw artikel
- `GET /api/systematiek/checklists` - Alle checklists
- `POST /api/systematiek/checklists` - Nieuwe checklist

### Compliance
- `GET /api/systematiek/compliance` - Alle regelgeving

### Gebruikers
- `GET /api/users` - Alle gebruikers
- `POST /api/users` - Nieuwe gebruiker
- `PUT /api/users/:id` - Gebruiker bijwerken

## 🎨 Frontend Features

### Responsive Design
- Mobiel-friendly interface
- Tailwind CSS styling
- Dark theme
- Glasmorphism effecten

### Componenten
- Navigation bar met mobilemenu
- Search en filter functionaliteit
- Cards en grid layouts
- Status badges
- Priority indicators

## 🔐 Beveiliging

- CORS ingeschakeld
- Helmet.js voor header security
- PostgreSQL prepared statements (SQL injection preventie)
- Environment variable configuratie

## 📈 Onderdelen van het Platform

### 1. RAW Vragen
- Stel vragen over RAW operations
- Filter op status en prioriteit
- Tag-gebaseerde categorisering
- Toewijzing aan experts

### 2. UAV Database
- Uitgebreide UAV specificaties
- Camera en sensor informatie
- Compliance certificaten
- Filterbare zoekfunctie

### 3. Knowledge Base
- Geverifieerde artikelen
- Moeilijkheidsgraden
- Trefwoorden en referenties
- Expert geverifieerde content

### 4. Checklists
- Downloadbare templates
- Operatie-specifieke checklists
- Aangepaste checklists aanmaken
- PDF export functionaliteit

### 5. Compliance Manager
- Regelgeving per jurisdictie
- Effectieve datums en updates
- UAV type filtering
- Vereisten en straffen

### 6. Community Forum
- Discussieonderwerpen
- Antwoorden en oplossingen
- Vastgezette topics
- View counter

### 7. Rapport Generator
- Automatische rapporten
- Template-gebaseerde generatie
- Multiple formaten (PDF, Excel)
- Publicatie opties

## 🔧 Development

### Scripts
```bash
npm run dev          # Start development servers
npm start            # Production start
npm run build        # Build frontend
npm run test         # Run tests
npm run db:init      # Initialize database
```

### Folder Structure Best Practices

- **Backend**: Modulaire route structuur
- **Frontend**: Page-based routing (Next.js)
- **Components**: Reusable React components
- **Styling**: Tailwind CSS utilities

## 🤝 Bijdragen

Bijdragen zijn welkom! 

1. Fork de repository
2. Maak een feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit je changes (`git commit -m 'Add some AmazingFeature'`)
4. Push naar de branch (`git push origin feature/AmazingFeature`)
5. Open een Pull Request

## 📝 Licentie

Dit project is gelicentieerd onder de MIT Licentie - zie het LICENSE bestand voor details.

## 🤖 Technologie Stack

### Backend
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **Node.js** - Runtime

### Frontend
- **Next.js** - React framework
- **Tailwind CSS** - Styling
- **React Icons** - Icons
- **Axios** - HTTP client

## 📞 Support

Voor vragen en ondersteuning:
- 📧 Email: support@rawplatform.nl
- 💬 Forum: https://forum.rawplatform.nl
- 🐛 Issues: GitHub Issues

## 🗺️ Roadmap

- [ ] Authentication & Authorization
- [ ] Geavanceerde search functionaliteit
- [ ] AI-powered antwoordsuggestions
- [ ] Mobile app
- [ ] Real-time notificaties
- [ ] Video tutorials
- [ ] Integratie met externe APIs
- [ ] Advanced analytics
- [ ] Multilingual support

## 📊 Statistieken

- 📌 RAW Vragen Management System
- 🚁 UAV Specificaties Database (100+ modellen)
- 📚 Knowledge Base (500+ artikelen)
- ✅ Checklist Templates (50+ checklists)
- ⚖️ Compliance Database (regels per jurisdictie)
- 👥 Community Forum (1000+ gebruikers)
- 📄 Report Generator

---

**Gemaakt voor RAW professionals door RAW professionals** 🚁✨
