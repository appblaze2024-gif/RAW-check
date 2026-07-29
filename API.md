# API Documentatie

Base URL: `http://localhost:5000/api`

## 🏥 Health Check

### Get Platform Status
```
GET /health

Response:
{
  "status": "Platform is actief",
  "timestamp": "2024-07-29T10:30:00.000Z"
}
```

---

## 🙋 RAW Vragen API

### Alle Vragen Ophalen
```
GET /questions

Query Parameters:
- category (optional): Filter op categorie
- status (optional): open, in_progress, resolved, closed
- priority (optional): high, medium, low

Response:
[
  {
    "id": "uuid",
    "title": "Vraag titel",
    "description": "Beschrijving",
    "category": "Regelgeving",
    "status": "open",
    "priority": "high",
    "created_by": "user-uuid",
    "assigned_to": "user-uuid",
    "tags": ["tag1", "tag2"],
    "created_at": "2024-07-29T10:00:00Z",
    "updated_at": "2024-07-29T10:00:00Z"
  }
]
```

### Specifieke Vraag Ophalen
```
GET /questions/:id

Response:
{
  "id": "uuid",
  "title": "Vraag titel",
  "description": "Beschrijving",
  "category": "Regelgeving",
  "status": "open",
  "priority": "high",
  "created_by": "user-uuid",
  "assigned_to": "user-uuid",
  "tags": ["tag1", "tag2"],
  "created_at": "2024-07-29T10:00:00Z",
  "updated_at": "2024-07-29T10:00:00Z"
}
```

### Nieuwe Vraag Aanmaken
```
POST /questions

Body:
{
  "title": "Mijn RAW vraag",
  "description": "Gedetailleerde beschrijving",
  "category": "Regelgeving",
  "subcategory": "Vluchtverboden",
  "priority": "high",
  "created_by": "user-uuid",
  "tags": ["urgent", "europa"]
}

Response: 201 Created
```

### Vraag Bijwerken
```
PUT /questions/:id

Body:
{
  "title": "Updated titel",
  "description": "Updated beschrijving",
  "status": "in_progress",
  "assigned_to": "expert-uuid",
  "priority": "medium"
}

Response: 200 OK
```

### Vraag Verwijderen
```
DELETE /questions/:id

Response: 204 No Content
```

---

## 🚁 UAV Database API

### Alle UAVs Ophalen
```
GET /uav

Query Parameters:
- type (optional): multicopter, fixed-wing, hybrid
- manufacturer (optional): DJI, Freefly, etc.

Response:
[
  {
    "id": "uuid",
    "model_name": "Phantom 4 Pro",
    "manufacturer": "DJI",
    "type": "multicopter",
    "max_flight_time": 28,
    "max_distance": 7000,
    "max_altitude": 6000,
    "weight": 1375,
    "camera_specs": {
      "sensor": "1 inch CMOS",
      "resolution": "20MP",
      "video": "4K"
    },
    "sensors": ["GPS", "Lidar", "IMU"],
    "compliance_certifications": ["CE", "FCC"],
    "created_at": "2024-07-29T10:00:00Z"
  }
]
```

### Specifieke UAV Ophalen
```
GET /uav/:id

Response:
{
  "id": "uuid",
  "model_name": "Phantom 4 Pro",
  "manufacturer": "DJI",
  ...
}
```

### Nieuwe UAV Toevoegen
```
POST /uav

Body:
{
  "model_name": "Phantom 4 Pro",
  "manufacturer": "DJI",
  "type": "multicopter",
  "max_flight_time": 28,
  "max_distance": 7000,
  "max_altitude": 6000,
  "weight": 1375,
  "camera_specs": {
    "sensor": "1 inch CMOS",
    "resolution": "20MP"
  },
  "sensors": ["GPS", "Lidar", "IMU"],
  "compliance_certifications": ["CE", "FCC"],
  "created_by": "user-uuid"
}

Response: 201 Created
```

### UAV Bijwerken
```
PUT /uav/:id

Body:
{
  "max_flight_time": 30,
  "weight": 1370
}

Response: 200 OK
```

---

## 📚 Systematiek API

### Knowledge Base - Alle Artikelen
```
GET /systematiek/knowledge-base

Query Parameters:
- category (optional): Regelgeving, Veiligheid, etc.
- keyword (optional): Zoekwoord

Response:
[
  {
    "id": "uuid",
    "topic": "Artikel titel",
    "content": "Artikel inhoud",
    "category": "Regelgeving",
    "subcategory": "EASA",
    "keywords": ["EASA", "drone"],
    "difficulty_level": "beginner",
    "is_verified": true,
    "verified_by": "expert-uuid",
    "created_at": "2024-07-29T10:00:00Z"
  }
]
```

### Nieuw Artikel Toevoegen
```
POST /systematiek/knowledge-base

Body:
{
  "topic": "EASA Regelgeving",
  "content": "Uitgebreide inhoud",
  "category": "Regelgeving",
  "subcategory": "EASA",
  "keywords": ["EASA", "regelgeving"],
  "references": {
    "url": "https://easa.europa.eu",
    "title": "EASA Website"
  },
  "difficulty_level": "beginner",
  "created_by": "user-uuid"
}

Response: 201 Created
```

### Checklists - Alle Checklists
```
GET /systematiek/checklists

Query Parameters:
- category (optional): Pre-flight, Operations, etc.

Response:
[
  {
    "id": "uuid",
    "name": "Pre-Flight Checklist",
    "description": "Checklist voor pre-flight check",
    "category": "Pre-flight",
    "items": [
      { "id": 1, "text": "Battery check", "completed": false },
      { "id": 2, "text": "Camera check", "completed": false }
    ],
    "is_template": true,
    "created_at": "2024-07-29T10:00:00Z"
  }
]
```

### Nieuwe Checklist Aanmaken
```
POST /systematiek/checklists

Body:
{
  "name": "Pre-Flight Checklist",
  "description": "Beschrijving",
  "category": "Pre-flight",
  "items": [
    { "text": "Battery check" },
    { "text": "Camera check" },
    { "text": "GPS lock" }
  ],
  "created_by": "user-uuid",
  "is_template": true
}

Response: 201 Created
```

### Compliance Regelgeving
```
GET /systematiek/compliance

Query Parameters:
- jurisdiction (optional): Nederland, Duitsland, etc.

Response:
[
  {
    "id": "uuid",
    "regulation_code": "EASA Part 107",
    "title": "Open Category Operations",
    "description": "Regelgeving voor open category operaties",
    "jurisdiction": "EU",
    "effective_date": "2024-01-01",
    "affected_uav_types": ["multicopter", "fixed-wing"],
    "requirements": {
      "pilot_license": "Certificate of Competency",
      "insurance": "mandatory"
    },
    "penalties": {
      "violation": "fine up to €50,000"
    }
  }
]
```

---

## 👥 Gebruikers API

### Alle Gebruikers Ophalen
```
GET /users

Response:
[
  {
    "id": "uuid",
    "username": "john_doe",
    "email": "john@example.com",
    "role": "user",
    "organization": "Acme Corp",
    "expertise_level": "advanced",
    "created_at": "2024-07-29T10:00:00Z"
  }
]
```

### Specifieke Gebruiker Ophalen
```
GET /users/:id

Response:
{
  "id": "uuid",
  "username": "john_doe",
  "email": "john@example.com",
  "role": "user",
  "organization": "Acme Corp",
  "expertise_level": "advanced",
  "created_at": "2024-07-29T10:00:00Z"
}
```

### Nieuwe Gebruiker Aanmaken
```
POST /users

Body:
{
  "email": "user@example.com",
  "username": "new_user",
  "role": "user",
  "organization": "My Company",
  "expertise_level": "intermediate"
}

Response: 201 Created
```

### Gebruiker Bijwerken
```
PUT /users/:id

Body:
{
  "username": "updated_username",
  "expertise_level": "advanced",
  "organization": "New Organization"
}

Response: 200 OK
```

---

## 📄 Rapporten API

### Alle Rapporten Ophalen
```
GET /reports

Query Parameters:
- type (optional): checklist, analysis, compliance
- is_public (optional): true/false

Response:
[
  {
    "id": "uuid",
    "title": "Flight Operation Report",
    "type": "analysis",
    "content": "Rapport inhoud",
    "questions_addressed": ["question-uuid-1", "question-uuid-2"],
    "generated_by": "user-uuid",
    "format": "pdf",
    "is_public": false,
    "created_at": "2024-07-29T10:00:00Z"
  }
]
```

### Nieuw Rapport Aanmaken
```
POST /reports

Body:
{
  "title": "Flight Operation Report",
  "type": "analysis",
  "content": "Rapport inhoud",
  "questions_addressed": ["question-uuid"],
  "generated_by": "user-uuid",
  "format": "pdf",
  "is_public": false
}

Response: 201 Created
```

### Rapport Bijwerken
```
PUT /reports/:id

Body:
{
  "title": "Updated Title",
  "is_public": true
}

Response: 200 OK
```

---

## 🔍 Response Status Codes

| Code | Betekenis |
|------|-----------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 204 | No Content - Successful deletion |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Access denied |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Internal error |

---

## 🧪 Voorbeeld cURL Requests

### Get all questions
```bash
curl -X GET http://localhost:5000/api/questions
```

### Create new question
```bash
curl -X POST http://localhost:5000/api/questions \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Question",
    "description": "Description",
    "category": "Safety",
    "priority": "high",
    "created_by": "user-uuid"
  }'
```

### Update question
```bash
curl -X PUT http://localhost:5000/api/questions/question-uuid \
  -H "Content-Type: application/json" \
  -d '{
    "status": "resolved",
    "priority": "medium"
  }'
```

### Delete question
```bash
curl -X DELETE http://localhost:5000/api/questions/question-uuid
```

---

## 📝 Pagination (Future)

```
GET /questions?page=1&limit=20

Response:
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

---

**API Versie:** 1.0.0  
**Laatst bijgewerkt:** 2024-07-29  
**Status:** Active Development
