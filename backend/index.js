
require('dotenv').config();
const express = require("express");
const app = express();
//const cors = require('cors');
const router = require('./Routes/AuthRouter');

//app.use(cors());
app.use(express.json()); // This replaces the need for bodyParser


require('./Models/db');

app.use('/auth', router); // Corrected path

const PORT = process.env.PORT || 3000;

app.get('/ping', (req, res) => {
  res.json({
    msg:" chal rha hu bsdk  "
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
