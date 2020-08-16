const express = require('express')
const router = express.Router();
const { BlobServiceClient } = require("@azure/storage-blob");
const Busboy = require('busboy');
const { v4: uuidv4 } = require('uuid');


router.post("/am", (req, res) => {
  const busboy = new Busboy({ headers: req.headers });

  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
      file.on('data', function(data) {
       
        async function main() {
          console.log('Azure Blob storage v12 - JavaScript quickstart sample');
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
          const uploadBlobResponse = await blockBlobClient.uploadFile(data);
          console.log("Blob was uploaded successfully. requestId: ", uploadBlobResponse.requestId);

          console.log('\nListing blobs...');

          // List the blob(s) in the container.
          for await (const blob of containerClient.listBlobsFlat()) {
              console.log('\t', blob.name);
          }

        }
        main();
      });
    });


  req.pipe(busboy);
})

module.exports = router;