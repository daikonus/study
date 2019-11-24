const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/recipe_db",
  {useNewUrlParser: true}
);

const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

const subscriberSchema = mongoose.Schema({
  // <property>: <data type>,
  name: String,
  email: String,
  zipCode: Number
});

// const Subscriber = mongoose.model("Subscriber", subscriberSchema)

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

const Subscriber = require("./models/subscriber")

Subscriber.findOne({ name: "Jon Wexler" }).where("email", /wexler/);

var myQuery = Subscriber.findOne({
  name: "Jon Wexler"
  })
  .where("email", /wexler/);

myQuery.exec((error, data) => {
  if (data) console.log(data.name);
});
