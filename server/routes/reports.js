const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../config/database');

router.get('/', async (req, res) => {
  try {
    const { type, is_public } = req.query;
    let query = 'SELECT * FROM reports WHERE 1=1';
    const params = [];

    if (type) {
      query += ' AND type = $' + (params.length + 1);
      params.push(type);
    }
    if (is_public !== undefined) {
      query += ' AND is_public = $' + (params.length + 1);
      params.push(is_public === 'true');
    }

    query += ' ORDER BY created_at DESC';
    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM reports WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Rapport niet gevonden' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, type, content, questions_addressed, generated_by, format, is_public } = req.body;
    const id = uuidv4();

    const result = await db.query(
      `INSERT INTO reports (id, title, type, content, questions_addressed, generated_by, format, is_public)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [id, title, type, content, questions_addressed || [], generated_by, format || 'pdf', is_public || false]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { title, content, is_public } = req.body;

    const result = await db.query(
      `UPDATE reports
       SET title = COALESCE($2, title),
           content = COALESCE($3, content),
           is_public = COALESCE($4, is_public),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $1 RETURNING *`,
      [req.params.id, title, content, is_public]
    );

    if (result.rows.length === 0) return res.status(404).json({ error: 'Rapport niet gevonden' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
