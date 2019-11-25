const express = require("express"),
  app = express(),
    layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const subscribersController = require("./controllers/subscribersController");
const db = mongoose.connection;
// const subscriberSchema = mongoose.Schema({
//   // <property>: <data type>,
//   name: String,
//   email: String,
//   zipCode: Number
// });
mongoose.connect(
  "mongodb://localhost:27017/recipe_db",
  {useNewUrlParser: true}
);
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});
mongoose.Promise = global.Promise

// HTTPリクエストを３０００ポートで受け付ける
app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), () => {
  console.log(
    `Server running at http://localhost:${app.get("port")}`
  );
});

app.set("view engine", "ejs");
app.use(layouts);
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

app.get("/contact", subscribersController.getSubscriptionPage);
app.post("/subscribe", subscribersController.saveSubscriber);
app.get("/subscribers", subscribersController.getAllSubscribers, (req, res, next) => {
  console.log(req.data);
});

// const Subscriber = mongoose.model("Subscriber", subscriberSchema)
//
// var subscriber1 = new Subscriber({
//   name: "Jon Wexler",
//   email: "jon@jonwexler.com"
// });
//
// subscriber1.save((error, saveDocument) => {
//   if (error) console.log(error);
//   console.log(saveDocument);
// });

// Subscriber.create(
//   {
//     name: "Jon Wexler",
//     email: "jon@jonwexler.com"
//   },
//   function (error, saveDocument) {
//     if (error) console.log(error);
//     console.log(saveDocument);
//   }
// );

// const Subscriber = require("./models/subscriber")
//
// Subscriber.findOne({ name: "Jon Wexler" }).where("email", /wexler/);
//
// var myQuery = Subscriber.findOne({
//   name: "Jon Wexler"
//   })
//   .where("email", /wexler/);
//
// myQuery.exec((error, data) => {
//   if (data) console.log(data.name);
// });
