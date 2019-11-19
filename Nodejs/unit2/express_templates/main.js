const port = 3000,
  express = require("express"),
  layouts = require("express-ejs-layouts"),
  app = express(),
  homeController = require("./controllers/homeController");

app.set("view engine", "ejs");
app.listen(port, () => {
  console.log(`Server runing on port number: ${port}`);
});

app.get("/name/:myName", homeController.respondWithName);
app.use(layouts);
