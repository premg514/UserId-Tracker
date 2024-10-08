const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Enable CORS
app.use(express.json());

let dataStore = []; // Example data store

// POST endpoint
app.post('/api/post', (req, res) => {
  const { userId, name } = req.body;

  // Log the incoming data
  console.log('Received POST data:', req.body);

  if (!userId || !name) {
    return res.status(400).json({ message: 'User ID and Name are required.' });
  }

  // Store data in memory (or a database)
  dataStore.push({ userId, name });
  return res.status(201).json({ message: 'Data submitted successfully.', data: { userId, name } });
});

// GET endpoint
app.get('/api/get', (req, res) => {
  res.status(200).json(dataStore);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
