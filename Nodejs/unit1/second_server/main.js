"use strict";

const port = 3000,
  http = require("http"),
  httpStatus = require("http-status-codes"),
  app = http.createServer();

const getJSONString = obj => {
  return JSON.stringify(obj, null, 2);
};

app.on("request", (req, res) => {
  var body = [];
  req.on("data", (bodyData) => {
    body.push(bodyData);
  });
  req.on("end", () => {
    body = Buffer.concat(body).toString();
    console.log(`Request Body Constents: ${body}`);
  });

  console.log(`Method: ${getJSONString(req.method)}`);
  console.log(`URL: ${getJSONString(req.url)}`);
  console.log(`Headers: ${getJSONString(req.headers)}`);

  res.writeHead(httpStatus.OK, {
    "Context-Type": "text/html"
  });

  let resposeMessage = "<h1>This will show on the screen.</h1>";
  res.end(resposeMessage);
});

app.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);
