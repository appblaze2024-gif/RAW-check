const pool = require('../config/database');

async function initializeDatabase() {
  try {
    console.log('📦 Database initialiseren...');

    // Users tabel
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        username VARCHAR(100) NOT NULL,
        password_hash VARCHAR(255),
        role VARCHAR(50) DEFAULT 'user',
        organization VARCHAR(255),
        expertise_level VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // RAW Vragen tabel
    await pool.query(`
      CREATE TABLE IF NOT EXISTS raw_questions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(500) NOT NULL,
        description TEXT,
        category VARCHAR(100),
        subcategory VARCHAR(100),
        priority VARCHAR(50),
        status VARCHAR(50) DEFAULT 'open',
        created_by UUID REFERENCES users(id),
        assigned_to UUID REFERENCES users(id),
        tags TEXT[],
        attachments JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // UAV Specificaties tabel
    await pool.query(`
      CREATE TABLE IF NOT EXISTS uav_specs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        model_name VARCHAR(255) NOT NULL,
        manufacturer VARCHAR(255),
        type VARCHAR(100),
        max_flight_time INTEGER,
        max_distance INTEGER,
        max_altitude INTEGER,
        weight DECIMAL(10, 2),
        camera_specs JSONB,
        sensors JSONB,
        compliance_certifications TEXT[],
        technical_details JSONB,
        created_by UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // RAW Systematiek Knowledge Base
    await pool.query(`
      CREATE TABLE IF NOT EXISTS raw_knowledge_base (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        topic VARCHAR(500) NOT NULL,
        content TEXT,
        category VARCHAR(100),
        subcategory VARCHAR(100),
        keywords TEXT[],
        references JSONB,
        difficulty_level VARCHAR(50),
        created_by UUID REFERENCES users(id),
        verified_by UUID REFERENCES users(id),
        is_verified BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // RAW Checklist tabel
    await pool.query(`
      CREATE TABLE IF NOT EXISTS raw_checklists (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(500) NOT NULL,
        description TEXT,
        category VARCHAR(100),
        items JSONB,
        created_by UUID REFERENCES users(id),
        is_template BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Compliance & Regelgeving tabel
    await pool.query(`
      CREATE TABLE IF NOT EXISTS compliance_regulations (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        regulation_code VARCHAR(100) NOT NULL,
        title VARCHAR(500),
        description TEXT,
        jurisdiction VARCHAR(100),
        effective_date DATE,
        end_date DATE,
        affected_uav_types TEXT[],
        requirements JSONB,
        penalties JSONB,
        references TEXT[],
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Rapporten tabel
    await pool.query(`
      CREATE TABLE IF NOT EXISTS reports (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(500) NOT NULL,
        type VARCHAR(100),
        content TEXT,
        questions_addressed UUID[],
        generated_by UUID REFERENCES users(id),
        format VARCHAR(50),
        is_public BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Discussie Forum tabel
    await pool.query(`
      CREATE TABLE IF NOT EXISTS forum_threads (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(500) NOT NULL,
        content TEXT,
        category VARCHAR(100),
        created_by UUID REFERENCES users(id),
        pinned BOOLEAN DEFAULT FALSE,
        views INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Forum Replies tabel
    await pool.query(`
      CREATE TABLE IF NOT EXISTS forum_replies (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        thread_id UUID REFERENCES forum_threads(id),
        content TEXT,
        created_by UUID REFERENCES users(id),
        is_solution BOOLEAN DEFAULT FALSE,
        upvotes INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('✅ Database succesvol geïnitialiseerd');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialisatiefout:', error);
    process.exit(1);
  }
}

initializeDatabase();
