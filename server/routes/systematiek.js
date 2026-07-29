const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../config/database');

router.get('/knowledge-base', async (req, res) => {
  try {
    const { category, keyword } = req.query;
    let query = 'SELECT * FROM raw_knowledge_base WHERE is_verified = TRUE';
    const params = [];

    if (category) {
      query += ' AND category = $' + (params.length + 1);
      params.push(category);
    }
    if (keyword) {
      query += ' AND keywords @> ARRAY[$' + (params.length + 1) + ']';
      params.push(keyword);
    }

    query += ' ORDER BY created_at DESC';
    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/knowledge-base', async (req, res) => {
  try {
    const { topic, content, category, subcategory, keywords, references, difficulty_level, created_by } = req.body;
    const id = uuidv4();

    const result = await db.query(
      `INSERT INTO raw_knowledge_base
       (id, topic, content, category, subcategory, keywords, references, difficulty_level, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [id, topic, content, category, subcategory, keywords || [], JSON.stringify(references), difficulty_level || 'medium', created_by]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/checklists', async (req, res) => {
  try {
    const { category } = req.query;
    let query = 'SELECT * FROM raw_checklists WHERE 1=1';
    const params = [];

    if (category) {
      query += ' AND category = $' + (params.length + 1);
      params.push(category);
    }

    query += ' ORDER BY name';
    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/checklists', async (req, res) => {
  try {
    const { name, description, category, items, created_by, is_template } = req.body;
    const id = uuidv4();

    const result = await db.query(
      `INSERT INTO raw_checklists
       (id, name, description, category, items, created_by, is_template)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [id, name, description, category, JSON.stringify(items), created_by, is_template || false]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/compliance', async (req, res) => {
  try {
    const { jurisdiction } = req.query;
    let query = 'SELECT * FROM compliance_regulations WHERE 1=1';
    const params = [];

    if (jurisdiction) {
      query += ' AND jurisdiction = $' + (params.length + 1);
      params.push(jurisdiction);
    }

    query += ' ORDER BY effective_date DESC';
    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
