// app.js
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Lumapps API endpoint and API key
const API_URL = 'https://go-cell-005.api.lumapps.com/';
const API_KEY = process.env.LUMAPPS_API_KEY;
const ORG_ID = process.env.ORG_ID;

// Middleware to serve static files
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve the form for user input
app.get('/form', (req, res) => {
  res.sendFile(__dirname + '/views/form.html');
});

// Serve the index file as the default route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Handle form submission to get data from Lumapps API
app.post('/getData', async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/v2/organizations/${ORG_ID}/applications`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from Lumapps API:', error);
    res.status(500).send('Error fetching data from Lumapps API');
  }
});

// Handle form submission to post data to Lumapps API
app.post('/postData', async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/your-endpoint`, req.body, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error posting data to Lumapps API:', error);
    res.status(500).send('Error posting data to Lumapps API');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
