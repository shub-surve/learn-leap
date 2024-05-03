const express = require('express');
const cors = require('cors')
const morgan =require('morgan')
const connect = require('./Database/Connections');
const router = require('./routers/route');


const app = express();

app.use(express.json())
app.use(cors());
app.use(morgan('tiny'))

// api routes
app.use('/api' , router)


const port = 3000;

app.get('/', (req, res) => {
    res.status(200).json("Home get response"); // Changed status code to 200
});

// Start server only after a valid connection
connect()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch(error => {
        console.error("Failed to connect to the database:", error);
        process.exit(1); // Exit the process with an error code
    });