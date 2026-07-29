const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../config/database');

router.get('/', async (req, res) => {
  try {
    const { category, status, priority } = req.query;
    let query = 'SELECT * FROM raw_questions WHERE 1=1';
    const params = [];

    if (category) {
      query += ' AND category = $' + (params.length + 1);
      params.push(category);
    }
    if (status) {
      query += ' AND status = $' + (params.length + 1);
      params.push(status);
    }
    if (priority) {
      query += ' AND priority = $' + (params.length + 1);
      params.push(priority);
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
    const result = await db.query('SELECT * FROM raw_questions WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Vraag niet gevonden' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, description, category, subcategory, priority, created_by, tags } = req.body;
    const id = uuidv4();

    const result = await db.query(
      `INSERT INTO raw_questions (id, title, description, category, subcategory, priority, created_by, tags)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [id, title, description, category, subcategory, priority || 'medium', created_by, tags || []]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { title, description, category, status, priority, assigned_to } = req.body;

    const result = await db.query(
      `UPDATE raw_questions
       SET title = COALESCE($2, title),
           description = COALESCE($3, description),
           category = COALESCE($4, category),
           status = COALESCE($5, status),
           priority = COALESCE($6, priority),
           assigned_to = COALESCE($7, assigned_to),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $1 RETURNING *`,
      [req.params.id, title, description, category, status, priority, assigned_to]
    );

    if (result.rows.length === 0) return res.status(404).json({ error: 'Vraag niet gevonden' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await db.query('DELETE FROM raw_questions WHERE id = $1 RETURNING id', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Vraag niet gevonden' });
    res.json({ message: 'Vraag verwijderd' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
