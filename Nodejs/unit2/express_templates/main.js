const port = 3000,
  express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController");

app.set("view engine", "ejs");
app.listen(port, () => {
  console.log(`Server runing on port number: ${port}`);
});
