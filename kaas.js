const express = require('express');
const fs = require('fs');
const app = express();

// Middleware to log IP addresses
app.use((req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    console.log(`New visit from IP: ${ip}`);

    // Append IP to the text file
    fs.appendFile('ip_logs.txt', ip + '\n', (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        }
    });

    next();
});

app.get('/', (req, res) => {
    res.send('Hello, your IP has been logged.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
