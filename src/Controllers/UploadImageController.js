const { Storage } = require('@google-cloud/storage')
const path = require("path")

const storage = new Storage({
  keyFilename: 'niveustraining-9258de61ae31.json',
})
const bucket = storage.bucket('bhagyashree-assignment');

function UploadImageController(req,res){
  console.log("upload fileee",req.file)
  try {
    const file = req.file;
    console.log(req.file)
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }

    const blob = bucket.file(file.originalname);
    const blobStream = blob.createWriteStream();

    blobStream.on('error', (err) => {
      console.log("-------->>>>>>",err)
      res.status(500).send(err);

    });

    blobStream.on('finish', () => {
      res.status(200).send('File uploaded to GCS.');
    });

    blobStream.end(file.buffer);

  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
}

module.exports = UploadImageController