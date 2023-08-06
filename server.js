const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors'); // Import the cors package
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors()); // Use cors middleware
 
// Endpoint to handle form submissions and save data to a file
app.post('/submit_form', (req, res) => {
  const { otherIssue, email } = req.body;
  const formData = `Other Issue: ${otherIssue}\nEmail: ${email}`;

  // Save the data to a file named "user_data.txt"
  fs.writeFile('user_data.txt', formData, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to save data.' });
    }
    res.json({ message: 'Form submitted successfully!' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
