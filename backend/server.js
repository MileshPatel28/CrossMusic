const express = require('express')
const app = express()
const port = 3001
const cors = require('cors')
const fs = require("fs")
const fsP = require("fs/promises")
const path = require("path")
const multer = require("multer")
const https = require('https')

app.use(cors())

var key = fs.readFileSync(__dirname + '/certs/selfsigned.key');
var cert = fs.readFileSync(__dirname + '/certs/selfsigned.crt');
var options = {
  key: key,
  cert: cert
};



const songsDir = path.join(__dirname, "api/songs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "api/songs"));
  },
  filename: (req, file, cb) => {
    const utf8Name = Buffer.from(file.originalname, "latin1").toString("utf8");
    cb(null,utf8Name)
  }
})
const upload = multer({ storage: storage })

app.use(express.static('public'))


// app.listen(port, () => {
//   console.log(`CrossMusic Server on port ${port}`)
// })

var server = https.createServer(options, app);

server.listen(port, () => {
  console.log("server starting on port : " + port)
});

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

app.delete("/delete/:songName", async (req,res) => {
  try {
    const { songName } = req.params;

    console.log(songName);

    const safeName = path.basename(songName);
    const filePath = path.join(songsDir, safeName + ".mp3");

    fs.unlink(filePath, (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to delete file" });
      }
      res.json({ success: true });
    });
  }catch(e){
    console.log(e);
  }
})
