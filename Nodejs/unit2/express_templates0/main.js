const port = 3000,
  express = require("express"),
  layouts = require("express-ejs-layouts"),
  app = express(),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController");

app.set("view engine", "ejs");
app.listen(port, () => {
  console.log(`Server runing on port number: ${port}`);
});

app.get("/name/:myName", homeController.respondWithName);
app.use(layouts);
app.use(errorController.logErrors);
app.use(errorController.respondNoresourceFound);
app.use(errorController.respondInternalError);
app.use(express.static("public"));
