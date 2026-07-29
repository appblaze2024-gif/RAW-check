const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../config/database');

router.get('/', async (req, res) => {
  try {
    const { type, manufacturer } = req.query;
    let query = 'SELECT * FROM uav_specs WHERE 1=1';
    const params = [];

    if (type) {
      query += ' AND type = $' + (params.length + 1);
      params.push(type);
    }
    if (manufacturer) {
      query += ' AND manufacturer = $' + (params.length + 1);
      params.push(manufacturer);
    }

    query += ' ORDER BY model_name';
    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM uav_specs WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'UAV niet gevonden' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const {
      model_name,
      manufacturer,
      type,
      max_flight_time,
      max_distance,
      max_altitude,
      weight,
      camera_specs,
      sensors,
      compliance_certifications,
      created_by
    } = req.body;

    const id = uuidv4();
    const result = await db.query(
      `INSERT INTO uav_specs
       (id, model_name, manufacturer, type, max_flight_time, max_distance, max_altitude, weight, camera_specs, sensors, compliance_certifications, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
      [id, model_name, manufacturer, type, max_flight_time, max_distance, max_altitude, weight, JSON.stringify(camera_specs), JSON.stringify(sensors), compliance_certifications || [], created_by]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const {
      model_name,
      manufacturer,
      type,
      max_flight_time,
      max_distance,
      max_altitude,
      weight,
      camera_specs,
      sensors
    } = req.body;

    const result = await db.query(
      `UPDATE uav_specs
       SET model_name = COALESCE($2, model_name),
           manufacturer = COALESCE($3, manufacturer),
           type = COALESCE($4, type),
           max_flight_time = COALESCE($5, max_flight_time),
           max_distance = COALESCE($6, max_distance),
           max_altitude = COALESCE($7, max_altitude),
           weight = COALESCE($8, weight),
           camera_specs = COALESCE($9, camera_specs),
           sensors = COALESCE($10, sensors),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $1 RETURNING *`,
      [req.params.id, model_name, manufacturer, type, max_flight_time, max_distance, max_altitude, weight, JSON.stringify(camera_specs), JSON.stringify(sensors)]
    );

    if (result.rows.length === 0) return res.status(404).json({ error: 'UAV niet gevonden' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
