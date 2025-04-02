const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Message storage
let allMsgs = [
  { msg: "Hello World", author: "Alice", date: "2024-03-30" },
  { msg: "foobar", author: "Bob", date: "2024-03-31" },
  { msg: "Asma I love you", author: "Jabir", date: "2024-04-01" }
];

// Counter endpoints
let compteur = 0;
app.get('/cpt/query', (req, res) => {
    res.json({ compteur });
});

app.get('/cpt/inc', (req, res) => {
    let v = parseInt(req.query.v);
    if (!isNaN(v)) {
        compteur += v;
        res.json({ code: 0 });
    } else {
        res.json({ code: -1 });
    }
});

// Message endpoints
app.get('/msg/getAll', (req, res) => {
    res.json(allMsgs);
});

app.get('/msg/get/:id', (req, res) => {
    let id = parseInt(req.params.id);
    if (!isNaN(id) && id >= 0 && id < allMsgs.length) {
        res.json({ code: 1, msg: allMsgs[id] });
    } else {
        res.json({ code: 0 });
    }
});

app.get('/msg/nber', (req, res) => {
    res.json({ count: allMsgs.length });
});

// Modified to accept author and date
app.get('/msg/post/:message', (req, res) => {
    const msg = decodeURIComponent(req.params.message);
    const author = req.query.author || "Anonymous";
    const date = new Date().toISOString().split('T')[0];

    allMsgs.push({ msg, author, date });
    res.json({ code: 1, id: allMsgs.length - 1 });
});

app.get('/msg/del/:id', (req, res) => {
    let id = parseInt(req.params.id);
    if (!isNaN(id) && id >= 0 && id < allMsgs.length) {
        allMsgs.splice(id, 1);
        res.json({ code: 1 });
    } else {
        res.json({ code: 0 });
    }
});

// Delete all messages
app.delete('/msg/clearAll', (req, res) => {
  allMsgs = [];  // Clear the messages array
  res.json({ code: 1, message: "All messages cleared" });
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});