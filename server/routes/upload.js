const express = require('express')
const router = express.Router();
const Busboy = require('busboy');
const { v4: uuidv4 } = require('uuid');
const { BlobServiceClient } = require("@azure/storage-blob");


router.post('/upload', function(req, res) {
  var busboy = new Busboy({ headers: req.headers });

  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
    file.on('data', function(data) {
      console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
    });
    file.on('end', function() {
      console.log('File [' + fieldname + '] Finished');
    });

    async function main(stuff) {
        const connectionString = process.env.CONNECTION_STRING
        // Create the BlobServiceClient object which will be used to create a container client
        const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
      
        // Create a unique name for the container
        const containerName = 'quickstart' + uuidv4();
      
        console.log('\nCreating container...');
        console.log('\t', containerName);
      
        // Get a reference to a container
        const containerClient = blobServiceClient.getContainerClient(containerName);
      
        // Create the container
        const createContainerResponse = await containerClient.create();
        console.log("Container was created successfully. requestId: ", createContainerResponse.requestId);
      
       // Create a unique name for the blob
        const blobName = 'quickstart' + uuidv4() + '.jpg';
      
        // Get a block blob client
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      
        console.log('\nUploading to Azure storage as blob:\n\t', blobName);
      
        // Upload data to the blob
        //const data = require('./test.jpg')
        const uploadBlobResponse = await blockBlobClient.uploadFile(stuff);
        console.log("Blob was uploaded successfully. requestId: ", uploadBlobResponse.requestId);

    }

    main(file);
     
 });
  req.pipe(busboy);
  });


module.exports = router;

  