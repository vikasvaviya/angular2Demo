var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./EmployeeHour');
var EmployeeSchema = Schema({
  Name: {FirstName: String, LastName: String},
  Email: {type:String,index: {unique: true, dropDups: true}},
  Mobile: Number,
  Address: String,
  Dob: Date,
  Designation: String,
  City: String,
  State: String,
  Country: String,
  Joining_Date: Date,
  Zipcode: Number,
  Password: Number,
  Role : {type:String, default: 'EMPLOYEE'},
  Status: {type:Boolean, default:false},
  EmployeeHourid: [{type: Schema.Types.ObjectId, ref: 'EmployeeHour'}]
});

module.exports = mongoose.model('Employee', EmployeeSchema);