var moment = require('moment');

var today = new Date();
var today_moment = moment();
var today_unix = moment().unix();

console.log(today);
console.log(today_moment);
console.log(today_unix);

