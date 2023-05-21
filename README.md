"# b7a11-toy-marketplace-server-side-Shamiul-Lipu" 


CleverCare live link :   https://clevercare-8929f.web.app/

server live link:    https://server-side-rho-one.vercel.app/

# CleverCare

 
**This server-side code sets up an Express.js server with routes for handling requests related to toy data and courses. It connects to a MongoDB database, defines endpoints for CRUD operations on toy data, and includes a route for fetching course data. The server listens on a specified port and provides responses based on the requested endpoints.**

* The server uses the cors middleware and parses incoming requests as JSON using express.json().
* It connects to a MongoDB database using the provided credentials and creates a MongoClient instance.
* The server defines several routes using app.get() and app.post() methods to handle different types of requests.
* The routes include fetching toy data based on search parameters, sorting and limiting toy data, fetching toy data by category, inserting new toy data, retrieving user-specific toy data, updating and deleting toy data, and fetching course data.
* The server initializes indexes on the toy collection for efficient searching.
* The server pings the MongoDB deployment to confirm the connection.
* The server also defines a default route that sends a simple response indicating that the server is running.
* The server starts listening on the specified port.

## CleverCare Live Link
**Hosted in Firebase ->** [https://clevercare-8929f.web.app/](https://clevercare-8929f.web.app/)


**server hosted in vercel ->** [https://server-side-rho-one.vercel.app/](https://server-side-rho-one.vercel.app/)

## [CleverCare Live Link](https://clevercare-8929f.web.app/)
