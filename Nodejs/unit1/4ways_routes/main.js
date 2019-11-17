"use strict";

const routeResponseMap = {
  "/info": "<h1>Info Page</h1>",
  "/contact": "<h1>Contact Us</h1>",
  "/about": "<h1>Learn More About Us</h1>",
  "/hello": "<h1>Say hello by emailing us <a href=#>here</a></h1>",
  "/error": "<h1>Sorry, the page you are looking for is not here</h1>"
};

const getJSONString = obj => {
  return JSON.stringify(obj, null, 2);
};

const port = 3000,
  http = require("http"),
  httpStatus = require("http-status-codes"),
  app = http.createServer((req, res) => {

    console.log(`Method: ${getJSONString(req.method)}`);
    console.log(`URL: ${getJSONString(req.url)}`);
    console.log(`Headers: ${getJSONString(req.headers)}`);

    if (routeResponseMap[req.url]) {
      if (req.url === "/error") {
        res.writeHead(404, {"Content-Type": "text/html"});
        setTimeout(() => res.end(routeResponseMap[req.url]), 5000);
      } else {
        res.writeHead(200, {"Content-Type": "text/html"});
        setTimeout(() => res.end(routeResponseMap[req.url]), 2000);
      }
    } else {
      res.writeHead(200, {"Content-Type": "text/html"});
      res.end("<h1>Welcome!</h1>");
    }

  });

app.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);
