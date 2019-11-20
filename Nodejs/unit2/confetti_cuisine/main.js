const express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  layouts = require("express-ejs-layouts");

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
