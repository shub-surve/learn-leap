const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dbConnect = require('./Database/Connections');
const route = require('./routers/route')

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.use('/api' , route)

const port = 3000;


dbConnect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  });