const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./config/database');

app.get('/api/health', (req, res) => {
  res.json({ status: 'Platform is actief', timestamp: new Date() });
});

app.use('/api/questions', require('./routes/questions'));
app.use('/api/uav', require('./routes/uav'));
app.use('/api/systematiek', require('./routes/systematiek'));
app.use('/api/users', require('./routes/users'));
app.use('/api/reports', require('./routes/reports'));

app.listen(PORT, () => {
  console.log(`🚀 RAW Systematiek Platform draait op poort ${PORT}`);
});
