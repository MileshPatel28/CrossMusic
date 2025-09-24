const express = require('express')
const app = express()
const port = 3000
const fs = require("fs");
const path = require("path");


const songsDir = path.join(__dirname, "api/songs");


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`CrossMusic Server on port ${port}`)
})

app.use("/songs", express.static(path.join(__dirname, "api/songs")));

app.get('/api/songs', (req,res) => {
  fs.readdir(songsDir,(err,files) => {
    if(err){
        return res.status(500).json({ error: "Unable to scan songs directory" });
    }

    const songs = [];

    files.forEach((file) => {
      if(file.endsWith(".mp3")){
        songs.push(
          {
            url: `/songs/${file}`,
            title: path.parse(file).name
          }
        )
      }
    })

    res.json(songs);
  })
})