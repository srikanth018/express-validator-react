// server.js
const express = require('express');
const { body, validationResult } = require('express-validator');

const app = express();
const PORT = 3002; // Change this line to use a different port

app.use(express.json());

app.post(
  '/api/submit-form',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Process form data here

    res.json({ success: true });
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
