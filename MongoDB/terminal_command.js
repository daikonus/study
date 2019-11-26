const mongoose = require("mongoose"),Subscriber = require("/Users/noguchidaiki/git/study/Nodejs/unit4/confetti_cuisine/models/subscriber");

mongoose.connect("mongoose://localhost:27017/recipe_db",{useNewUrlParser: true});

mongoose.Promise = global.Promise;
