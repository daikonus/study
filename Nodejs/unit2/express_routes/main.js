const port = 3000,
  express = require("express"),
  app = express();


app.get("/items/:vegetable", (req, res) => {
  res.send(req.params.vegetable);
  let veg = req.params.vegetable;
  res.send(`This is the page for ${veg}`)
  app.use((req,res, next) => {
    console.log(`request made to: ${req.url}`);
    nest();
  });
});

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
