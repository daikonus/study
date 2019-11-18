const port = 3000,
      http = require("http"),
      httpStatusCodes = require("http-status-codes"),
      router = require("./router"),
      fs = require("fs"),
      plainTextContentType = {
        "Content-Type": "text/plain"
      },
      htmlContentType = {
        "Content-Type": "text/html"
      },
      cssContentType = {
        "Content-Type": "text/css"
      },
      jsContentType = {
        "Content-Type": "text/javascript"
      },
      imageContentType = {
        "Content-Type": "image/jpeg"
      },
      customReadFile = (file, res) => {
        fs.readFile(`./${file}`, (error, data) => {
          if (error) {
            console.log("Error reading the file...");
          }
          res.end(data);
        });
      };

router.get("/", (req, res) => {
  res.writeHead(httpStatusCodes.OK, plainTextContentType);
  res.end("INDEX");
});

router.get("/index.html", (req, res) => {
  res.writeHead(httpStatusCodes.OK, htmlContentType);
  customReadFile("views/index.html", res);
});

router.get("/blog.html", (req, res) => {
  res.writeHead(httpStatusCodes.OK, htmlContentType);
  customReadFile("views/blog.html", res);
});

router.get("/uikit-rtl.min.css", (req, res) => {
  res.writeHead(httpStatusCodes.OK, cssContentType);
  customReadFile("public/css/uikit-rtl.min.css", res);
});

router.get("/uikit.min.js", (req, res) => {
  res.writeHead(httpStatusCodes.OK, jsContentType);
  customReadFile("public/js/uikit.min.js", res);
});

router.get("/uikit-icons.min.js", (req, res) => {
  res.writeHead(httpStatusCodes.OK, jsContentType);
  customReadFile("public/js/uikit-icons.min.js", res);
});

router.get("/images/wolf.jpg", (req, res) => {
  res.writeHead(httpStatusCodes.OK, imageContentType);
  customReadFile("public/images/wolf.jpg", res);
});

router.post("/", (req, res) => {
  res.writeHead(httpStatusCodes.OK, plainTextContentType);
  res.end("POSTED");
});

http.createServer(router.handle).listen(port);
console.log(`The server is listening on port number: ${port}`);
