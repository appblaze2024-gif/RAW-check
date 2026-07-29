const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'raw_systematiek'
});

pool.on('error', (err) => {
  console.error('Onverwachte fout in connection pool:', err);
});

module.exports = pool;
