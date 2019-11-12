"use strict";

const cities = require("cities");
var lat = 110;
var lng = 40;
var myGPS = cities.gps_lookup(lat, lng);
console.log(myGPS);

const sum_test = require("./test");
console.log(sum_test.addNum(lat, lng));
