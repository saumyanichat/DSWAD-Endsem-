const express = require("express");
const mongoose = require("mongoose");
const Song = require("./models/Song");

const app = express();
app.use(express.json());
app.use(express.static("public"));

// DB connect
mongoose
  .connect("mongodb://127.0.0.1:27017/music2")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

/* -------- INSERT -------- */
app.get("/insert", async (req, res) => {
  await Song.deleteMany();

  const data = [
    {
      Songname: "Tum Hi Ho",
      Film: "Aashiqui 2",
      Music_director: "Mithoon",
      Singer: "Arijit Singh",
      Actor: "Aditya Roy Kapur",
        Actress: "Shraddha Kapoor",
    },
    {
      Songname: "Kesariya",
      Film: "Brahmastra",
      Music_director: "Pritam",
      Singer: "Arijit Singh",
        Actor: "Ranbir Kapoor",
        Actress: "Alia Bhatt",
    },
    {
      Songname: "Kal Ho Na Ho",
      Film: "KHNH",
      Music_director: "Shankar-Ehsaan-Loy",
      Singer: "Sonu Nigam",
        Actor: "Shah Rukh Khan",
        Actress: "Preity Zinta",
    },
    {
      Songname: "Channa Mereya",
      Film: "ADHM",
      Music_director: "Pritam",
      Singer: "Arijit Singh",
        Actor: "Ranbir Kapoor",
        Actress: "Anushka Sharma",
    },
    {
      Songname: "Malang",
      Film: "Malang",
      Music_director: "Mithoon",
      Singer: "Ved Sharma",
        Actor: "Aditya Roy Kapur",
        Actress: "Disha Patani",
    },
  ];

  await Song.insertMany(data);
  res.send("Inserted");
});

/* -------- SHOW ALL -------- */
app.get("/songs", async (req, res) => {
  const songs = await Song.find();
  const count = songs.length;

  let html = `
    <h2>Total Songs: ${count}</h2>
    <table border="1">
    <tr>
      <th>Song</th>
      <th>Film</th>
      <th>Director</th>
      <th>Singer</th>
      <th>Actor</th>
      <th>Actress</th>
    </tr>
 `;

  songs.forEach((s) => {
    html += `
    <tr>
        <td>${s.Songname}</td>
        <td>${s.Film}</td>
        <td>${s.Music_director}</td>
        <td>${s.Singer}</td>
        <td>${s.Actor || ""}</td>
        <td>${s.Actress || ""}</td>
    </tr>`;
  });

  html += "</table>";
  res.send(html);
});

/* -------- COMMON SEARCH FUNCTION -------- */
async function findData(query, res) {
  const data = await Song.find(query);
  res.json(data);
}

/* -------- SEARCH -------- */
app.get("/director/:name", (req, res) => {
  findData({ Music_director: req.params.name }, res);
});

app.get("/dirSinger/:d/:s", (req, res) => {
  findData({ Music_director: req.params.d, Singer: req.params.s }, res);
});

app.get("/singerFilm/:s/:f", (req, res) => {
  findData({ Singer: req.params.s, Film: req.params.f }, res);
});

/* -------- ADD -------- */
app.post("/add", async (req, res) => {
  await Song.create(req.body);
  res.send("Added");
});

/* -------- DELETE -------- */
app.delete("/delete/:name", async (req, res) => {
  await Song.deleteOne({ Songname: req.params.name });
  res.send("Deleted");
});

/* -------- UPDATE -------- */
app.put("/update/:name", async (req, res) => {
  await Song.updateOne({ Songname: req.params.name }, { $set: req.body });
  res.send("Updated");
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
