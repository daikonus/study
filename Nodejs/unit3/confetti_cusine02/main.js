// expressフレームワーク、自分自身のクラスとなるapp、ejsレイアウトを使う為のやつ
const express = require("express"),
  app = express(),
  layouts = require("express-ejs-layouts");
// 画面遷移、エラー画面、CRUDのためのコントローラ
const subscribersController = require("./controllers/subscribersController"),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController");
// DBをうまく使うmongooseフレームワーク
const mongoose = require("mongoose");
// DBに接続するクラス
const db = mongoose.connection;
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
// レイアウトを使用する為のおまじない
app.set("view engine", "ejs");
app.use(layouts);
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(express.static("public"));

// 各パスとメソッドのリクエストをコントローラに投げる
app.get("/", homeController.landingpage);
app.get("/courses", homeController.showCourses);
app.get("/subscribers", subscribersController.getAllSubscribers);
app.get("/contact", subscribersController.getSubscriptionPage);
app.post("/subscribe", subscribersController.saveSubscriber);

// エラー処理
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);
