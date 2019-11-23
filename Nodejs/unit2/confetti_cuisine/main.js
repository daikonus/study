const express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  layouts = require("express-ejs-layouts");

// MongoDBをNodejsから操作する為のモジュールのロードとクライアント
const MongoDB = require("mongodb").MongoClient,
  dbURL = "mongodb://localhost:27017"
  // dbName = "recipe_db";
  dbName = "ice_store_db";

MongoDB.connect(dbURL, (error, client) => {
  if (error) throw error;
  let db = client.db(dbName);
  // db.collection("contacts")
  //   .find()
  //   .toArray((error, data) => {
  //     if (error) throw error;
  //     console.log(data);
  //   });
  // db.collection("contacts")
  //   .insert({
  //     name: "Freddie Mercury",
  //     email: "fred@queen.com"
  //   }, (error, db) => {
  //     if (error) throw error;
  //     console.log(db);
  //   });
  db.collection("ice_cream_flavors")
    .find()
    .toArray((error, data) => {
      if (error) throw error;
      console.log(data);
    });
  db.collection("ice_cream_flavors")
    .insert({
      flavors: "strawverry",
      cost: "5.0",
      area: "Tokyo"
    }, (error, db) => {
      if (error) throw error;
      console.log(db);
    });
});

// HTTPリクエストを３０００ポートで受け付ける
app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), () => {
  console.log(
    `Server running at http://localhost:${app.get("port")}`
  );
});

// EJSレイアウトのレンダリング設定
app.set("view engine", "ejs");
app.use(layouts);

app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

app.use(express.static("public"));

// リクエストパスをcontrollerで振り分ける定義
// app.get("/", (req, res) => {
//   res.send("Welcome to Confetti Cuisine!");
// });
app.get("/", homeController.landingpage);
app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);

// Error用のミドルウェア関数を追加
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);
