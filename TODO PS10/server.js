const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(express.static("public"));

const FILE = "task.json";

/* GET */
app.get("/task", (req, res) => {
    let info =fs.readFileSync(FILE, "utf-8");
    let data = JSON.parse(info);
    res.json(data);
});

/* ADD */
app.post("/add", (req, res) => {
    let info =fs.readFileSync(FILE, "utf-8");
    let data = JSON.parse(info);
    data.push({ 
        text: req.body.text 
    });
    fs.writeFileSync(FILE, JSON.stringify(data));
    res.send("Added");
});

/* DELETE */
app.delete("/delete/:i", (req, res) => {
    let info =fs.readFileSync(FILE, "utf-8");
    let data = JSON.parse(info);
    data.splice(req.params.i, 1);
    fs.writeFileSync(FILE, JSON.stringify(data));
    res.send("Deleted");
});

/* UPDATE */
app.put("/update/:i", (req, res) => {
    let info =fs.readFileSync(FILE, "utf-8");
    let data = JSON.parse(info);
    data[req.params.i].text = req.body.text;
    fs.writeFileSync(FILE, JSON.stringify(data));
    res.send("Updated");
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});