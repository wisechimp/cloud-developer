import * as dotenv from 'dotenv'
import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Initialise dotenv to pass environmental variables to the project
  dotenv.config()

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1
  app.get("/filteredimage", async (req, res) => {
    
    // Task 1 - check that there is a query
    const imageUrl: string = await req.query.image_url
    if (imageUrl === "") {
      return res.status(400).send("You need to include a query url.")
    }

    // Task 2 - pass the valid image's url through the filter provided    
    const filteredImage = await filterImageFromURL(imageUrl)

    // Task 3 - Send the filtered image in the response
    res.sendFile(filteredImage, () => {
      // Task 4 - delete the files saved locally
      deleteLocalFiles([filteredImage])
    })   
  })
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();