// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

// Initialize the Express application
const app = express();
const port = 3000; // Port where the server will listen

// Use bodyParser middleware
app.use(bodyParser.json());

// Use cors middleware to enable CORS
// app.use(cors());

app.use(cors({
    origin: 'http://localhost:4200' // Only allow this origin to access the API
}));

// Configure your MySQL connection details
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cinema_reservation'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to the MySQL server.');
});


// Define a POST route for confirming reservations
app.post('/confirm', (req, res) => {
  const reservationDetails = req.body; // Extract reservation details from the request body
  
  // Simulate saving the reservation to a database
  console.log('Saving reservation:', reservationDetails);

  const { movieTitle, showtime, seats } = req.body; // Destructure the reservation details from the request body
  
  const query = 'INSERT INTO reservation (movie_title, showtime, seats) VALUES (?, ?, ?)';
  
  db.query(query, [movieTitle, showtime, JSON.stringify(seats)], (err, result) => {
    if (err) {
      console.error('Error saving reservation:', err);
      res.status(500).json({ message: 'Error saving reservation' });
      return;
    }
    
    res.status(200).json({ message: 'Reservation saved successfully', reservationId: result.insertId });

    });

});

// Define a GET route for retrieving reservations
app.get('/reservations', (req, res) => {
    const query = 'SELECT * FROM reservation';
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error retrieving reservations:', err);
        res.status(500).send('Error retrieving reservations');
        return;
      }
  
      // Convert seats from string back to JSON, if necessary
      const reservations = results.map(result => ({
        ...result,
        seats: JSON.parse(result.seats)
      }));
      console.log('Retrieved reservations:', reservations);
      res.status(200).json(reservations);
    });
  });

  app.delete('/deleteReservations', (req, res) => {
    const query = 'DELETE FROM reservation';
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error deleting reservations:', err);
        res.status(500).send('Error deleting reservations');
        return;
      }
  
      console.log('Deleted all reservations');
      res.status(200).send('Deleted all reservations');
    });
  });

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
  