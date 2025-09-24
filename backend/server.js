const express = require('express')
const app = express()
const port = 3000
const fs = require("fs");
const path = require("path");
const multer = require("multer");


const songsDir = path.join(__dirname, "api/songs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "api/songs"));
  },
  filename: (req, file, cb) => {
    cb(null,file.originalname)
  }
})
const upload = multer({ storage: storage })

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`CrossMusic Server on port ${port}`)
})


// ============================================ MUSIC SERVER API ====================================================== //


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


app.post('/api/upload',upload.array("songs"), (req,res) => {
  const uploadedFiles = req.files.map((file) => file.filename);
  res.json({sucess: true, files: uploadedFiles})
})