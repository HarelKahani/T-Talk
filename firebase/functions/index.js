const functions = require('firebase-functions');
const os = require('os');
const path = require('path');
const spawn = require('child-process-promise').spawn;
const cors = require('cors')({origin: true});
const Busboy = require('busboy');
const fs = require('fs');
const uuidv4 = require('uuid-v4');
const { Storage }  = require('@google-cloud/storage');
const gcconfig = {
    projectId: "t-talk-game",
    keyFilename: "t-talk-game-firebase-adminsdk-4cpsk-f9464b03ad.json"
    };
let gcs = new Storage (gcconfig);
const uuid = uuidv4();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.onFileChange = functions.storage.object().onFinalize(event => { 
    console.log("Hi");   
    console.log(event);
    const object = event;
    const filePath = object.name;
    console.log(filePath)
    const bucket = object.bucket;
    const contentType = object.contentType;

    if(object.resourceState === "not_exists"){
        console.log("we really deleted this file");
        return;
    }

    // if(object.data.resourceState === "not_exists"){
    //     console.log("we deleted this file");
    //     return;
    // }

    if(path.basename(filePath).startsWith("small-")){
        console.log("this file was already renamed");
        return;
    }

    console.log("file archive detected. starting process");
    const destBucket =gcs.bucket(bucket);
    const tmpPath = path.join(os.tmpdir(), path.basename(filePath));
    const metadata = { 
        contentType: contentType, 
        metadata:{
            firebaseStorageDownloadTokens: uuid
        }
    };
    return destBucket.file(filePath).download({
        destination: tmpPath
        }).then(()=>{
            console.log("download success");
            return spawn('convert', [tmpPath, '-resize', '100x150', tmpPath]);
        }).then(()=>{
            return destBucket.upload(tmpPath,{
                destination: "resized/small-"+ path.basename(filePath),
                metadata: metadata,
            });
        });
});

exports.uploadFile = functions.https.onRequest((req, res)=>{
    cors(req, res, () => {
        if(req.method !== "POST"){
            return res.status(500).json({
                message: "message not allowed" 
            });
        }
        const busboy = new Busboy({headers: req.headers});
        let uploadData = null;
        busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
            console.log("befor opening /tmp")
            console.log(filename)
            const filepath = path.join(os.tmpdir(), filename)
            uploadData = {file: filepath, type: mimetype}
            console.log(uploadData)
            let ws = fs.createWriteStream(filepath, {flags: 'w'})
            console.log(file)
            file.pipe(ws);
            ws.on('error', function (err) {
                console.log(err);
              });
        });

        busboy.on('finish', () => {
            const bucket = gcs.bucket('t-talk-game.appspot.com');
            bucket.upload(uploadData.file, {
                uploadType: 'media',
                metadata: {
                    metadata:{
                        contentType: uploadData.type,
                        firebaseStorageDownloadTokens: uuid
                    }
                }
            }).then(()=> {
                return res.status(200).json({
                    message: "Upload success Boomer"
                });
            }).catch(err => {
                res.status(500).json({
                    error: err,
                    message: "An error has accured while upload"
                });
            });
        });
        busboy.end(req.rawBody)
    });
});

