const express = require('express')
const next = require('next')
const { v4: uuidv4 } = require('uuid');

const uploadRoute = require('./routes/upload');
const indexRoute = require('./routes/index');

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const { BlobServiceClient } = require("@azure/storage-blob");


// async function main() {
//   const connectionString = process.env.CONNECTION_STRING
//   // Create the BlobServiceClient object which will be used to create a container client
//   const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

//   // Create a unique name for the container
//   const containerName = 'quickstart' + uuidv4();

//   console.log('\nCreating container...');
//   console.log('\t', containerName);

//   // Get a reference to a container
//   const containerClient = blobServiceClient.getContainerClient(containerName);

//   // Create the container
//   const createContainerResponse = await containerClient.create();
//   console.log("Container was created successfully. requestId: ", createContainerResponse.requestId);

//  // Create a unique name for the blob
//   const blobName = 'quickstart' + uuidv4() + '.jpg';

//   // Get a block blob client
//   const blockBlobClient = containerClient.getBlockBlobClient(blobName);

//   console.log('\nUploading to Azure storage as blob:\n\t', blobName);

//   // Upload data to the blob
//   //const data = require('./test.jpg')
//   const uploadBlobResponse = await blockBlobClient.uploadFile('./test.jpg');
//   console.log("Blob was uploaded successfully. requestId: ", uploadBlobResponse.requestId);

// }



app.prepare().then(() => {
  const server = express()

  server.use("/", uploadRoute)
  server.use("/", indexRoute)
  
  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
