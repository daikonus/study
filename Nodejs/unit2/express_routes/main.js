const homeController = require("./controllers/homeController");
const port = 3000,
  express = require("express"),
  app = express();


app.get("/items/:vegetable", homeController.sendReqParam);
app.post("/sign_up", homeController.userSignProcessor);

app.listen(port, () => {
  console.log(`Server runing on port number: ${port}`);
});

app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.post("/", (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send("POST Successful!")
});
