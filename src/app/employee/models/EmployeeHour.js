var mongoose = require('mongoose');
require('./Employee');
var Schema =  mongoose.Schema;
var employehourschema = Schema({
  Empid: [{type: Schema.Types.ObjectId, ref: 'Employee'}],
  Login_Time: {type:String}  ,
  Logout_Time: {type:String} ,
  Date: {type:String},
  CurrentActiveTime: {type:Number, default: 0},
  Diffrence: Number
});
module.exports = mongoose.model('EmployeeHour', employehourschema)