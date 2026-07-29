const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../config/database');

router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT id, username, email, role, organization, expertise_level, created_at FROM users ORDER BY username');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT id, username, email, role, organization, expertise_level, created_at FROM users WHERE id = $1',
      [req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Gebruiker niet gevonden' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { email, username, role, organization, expertise_level } = req.body;
    const id = uuidv4();

    const result = await db.query(
      `INSERT INTO users (id, email, username, role, organization, expertise_level)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, username, email, role, organization, expertise_level`,
      [id, email, username, role || 'user', organization, expertise_level]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { username, organization, expertise_level, role } = req.body;

    const result = await db.query(
      `UPDATE users
       SET username = COALESCE($2, username),
           organization = COALESCE($3, organization),
           expertise_level = COALESCE($4, expertise_level),
           role = COALESCE($5, role),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $1 RETURNING id, username, email, role, organization, expertise_level`,
      [req.params.id, username, organization, expertise_level, role]
    );

    if (result.rows.length === 0) return res.status(404).json({ error: 'Gebruiker niet gevonden' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
