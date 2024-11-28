// Create web server
// Create a web server that listens for requests on port 3000
// When a request is received, the server should read the contents of the comments.json file and respond with the contents of the file.
// If the file does not exist, the server should respond with a 404 status code.
// If the file exists but there is an error reading the file, the server should respond with a 500 status code.
// If the request is for a path that does not exist, the server should respond with a 404 status code.
// The server should only respond to GET requests.

// Use the following code as a starting point:
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.method !== 'GET') {
    res.statusCode = 404;
    res.end();
    return;
  }

  if (req.url === '/comments') {
    fs.readFile('comments.json', 'utf8', (err, data) => {
      if (err) {
        if (err.code === 'ENOENT') {
          res.statusCode = 404;
        } else {
          res.statusCode = 500;
        }
        res.end();
        return;
      }

      res.setHeader('Content-Type', 'application/json');
      res.end(data);
    });
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(3000);

// To test the server, create a comments.json file in the same directory as the comments.js file with the following content:
// {
//   "comments": [
//     {
//       "id": 1,
//       "text": "First comment"
//     },
//     {
//       "id": 2,
//       "text": "Second comment"
//     }
//   ]
// }
// Start the server by running the comments.js file with Node.js and use a web browser or a tool like curl to make a GET request to http://localhost:3000/comments. The server should respond with the contents of the comments.json file.