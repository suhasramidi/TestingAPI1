const express = require('express');
const { resolve } = require('path');
const bodyParser = require('body-parser');
const studentData = require('./data.json'); // Import your student data

const app = express();
const port = 3010;

app.use(express.static('static'));
app.use(bodyParser.json()); // Use body-parser to parse JSON request bodies

app.get('/', (req, res) => {
    res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.post('/students/above-threshold', (req, res) => {
    const { threshold } = req.body;

    // Input validation: Check if threshold is a number
    if (typeof threshold !== 'number') {
        return res.status(400).json({ error: 'Invalid threshold. Threshold must be a number.' });
    }

    const filteredStudents = studentData.filter(student => student.total > threshold);

    const response = {
        count: filteredStudents.length,
        students: filteredStudents.map(student => ({ name: student.name, total: student.total }))
    };

    res.json(response);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});