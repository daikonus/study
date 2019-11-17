const port = 3000,
  express = require("express"),
  app = express();

app.post("/", (req, res) => {
  res.send("Hello, Universe!");
  console.log(req.params);
  console.log(req.body);
  console.log(req.url);
  console.log(req.query);
})
.listen(port, () => {
  console.log(`The Express.js server has started and is listening on port number: ${port}`);
});
