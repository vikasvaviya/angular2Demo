var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var app = express();
var multer = require('multer');
var moment = require('moment');
require('dotenv/config');
app.use(passport.initialize());

var Employee = require('./src/app/employee/models/Employee');
var EmployeeHour = require('./src/app/employee/models/EmployeeHour');
mongoose.connect('mongodb://localhost:27017/'+ process.env.DB, function (err, res) {
  if (err) {
   return res.send(err);
  } else {
    console.log('connected');
  }
})
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,image/gif' );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
/*
app.use(logger('dev'));
*/

var interval;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': 'false'}));
var storage = multer.diskStorage({
  destination: function (req,file,cb) {
    cb(null,'./uploads')
  },
  filename: function (req,file,cb) {
    cb(null, file.originalname)
  }
});

var upload = multer({storage: storage});

app.post('/upload',upload.array('uploads[]',12),function (req,res) {
  res.send(req.files)
});
app.post('/NewEmployee',function (req,res) {
  var employee = new Employee({
    Name: {FirstName: req.body.FirstName, LastName: req.body.LastName},
    Email: req.body.Email,
    Mobile: req.body.Mobile,
    Address: req.body.Address,
    Dob: req.body.Birthdate,
    Designation: req.body.Designation,
    City: req.body.City,
    State: req.body.State,
    Country: req.body.Country,
    Joining_Date: req.body.Joining_Date,
    Zipcode: req.body.Zipcode,
    Role: 'EMPLOYEE',
    Status:false,
    Password: req.body.Password
  });
  employee.save(function (err) {
    if(err) {
      return res.send({success: false, msg: 'Email Already Registered'});
    } else {
      return res.send({success: true, msg: 'successfully created new employee'});
    }
  });
});
app.get('/GetEmployee',function (req,res) {
  Employee.find({},null,{sort:{_id:-1}},function (err,data) {
    if(err) {
      return res.send(err);
    } else {
      return res.send(data);
    }
  })
});

app.get('/GetCurrentEmployee/:id',function (req,res) {
  EmployeeHour.aggregate([
    {$match:{$and:[{Empid: new mongoose.Types.ObjectId(req.params.id)},{ Date: new Date(moment().format('D/MM/YYYY')) }]}},
    {$group:{
      _id:"$Empid",
      Name:{$push: "$EmployeeDocs.FirstName"},
      Date:{ $push: "$Date"},
      Total:{$sum:"$CurrentActiveTime"}
    }}
  ],function (err,data) {
    if(err) {
      throw err
    } else {
      res.send(data);
      for(var i=0;i < data.length; i++){
        var ID = data[i]._id.Empid;
        console.log(data);

      }
    }
  })
});
app.delete('/DeleteEmployee/:id',function (req,res) {
  Employee.remove({_id:req.params.id},function (err,data) {
    if(err) {
      return res.send(err);
    }
    return res.json({msg:'Employee Successfully Deleted..'});
  })
});
app.post('/EditEmployee/:id',function (req,res) {
  Employee.findByIdAndUpdate({_id:req.params.id}, {$set:{
    Name: {FirstName: req.body.FirstName, LastName: req.body.LastName},
    Email: req.body.Email,
    Mobile: req.body.Mobile,
    Address: req.body.Address,
    Dob: req.body.Birthdate,
    Designation: req.body.Designation,
    City: req.body.City,
    State: req.body.State,
    Country: req.body.Country,
    Joining_Date: req.body.Joining_Date,
    Zipcode: req.body.Zipcode,
    Role: 'EMPLOYEE',
    Password: req.body.Password }} ,function (err,data) {
    if(err) {
      return res.send(err);
    }
    return res.json({msg:'Employee Successfully Updated..'});
  })
});
app.get('/GetUpdateData/:id',function (req,res) {
  Employee.findOne({_id:req.params.id},function (err,data) {
    if(err) {
      return res.send(err);
    }
    return res.send(data)
  });
});

app.post('/Work/:id',function (req,res) {
  if(req.params.id == 'true') {
    EmployeeHour.findOne({Empid:req.body.employee._id,Date:moment().format('D/MM/YYYY')},function (err,emp) {
        var employeehour = new EmployeeHour({
          Empid: req.body.employee._id,
          Login_Time: moment().format('h:M a'),
          Logout_Time: moment().format('h:M a'),
          Date: moment().format('D/MM/YYYY'),
          Diffrence: '',
          CurrentActiveTime: 0
        });

        employeehour.save(function (err, data) {
          if(err) {
            return res.send(err);
          } else {
            Employee.findByIdAndUpdate({_id: req.body.employee._id,Date: moment().format('D/MM/YYYY')}, {$set: {Status: true}}, function (err, data) {
              if (err) throw err;
              res.send(data);
              intervaldoc(data._id);
            });
/*
            intervaldoc(data.Empid);
*/
          }
        });
    })
  }  else {
     Employee.findByIdAndUpdate({_id: req.body.employee._id,Date: moment().format('D/MM/YYYY')}, {$set: {Status: false}}, function (err, data) {
       if (err) throw err;
        res.send(data);
       intervaldoc(data._id);
     });

    EmployeeHour.update({Empid:req.body.employee._id , Date:moment().format('D/MM/YYYY')},{ $set: { Logout_Time: moment().format('h:M a') }},function (err, data) {
      if(err) throw err;
    });

 /*   EmployeeHour.findOne({Empid:req.body.employee._id , Date:moment().format('D/MM/YYYY')}).exec(function (err, result) {
      var a = moment(result.Logout_Time,'h:M a');
      var b = moment(result.Login_Time,'h:M:ss a');
      var d = a.diff(b);
      var durattion = Math.abs(moment.duration(d).asHours());

      EmployeeHour.update({_id:result._id},{$set:{Diffrence:durattion }},function (err,data) {
        if(err) throw err;
      });
    });*/
  }
});
function intervaldoc(id) {
  Employee.findOne({_id: id}).exec(function (err, result) {
    if (result.Status === true) {
      interval = setInterval(function () {
          EmployeeHour.findOneAndUpdate({Empid: result._id, Date:moment().format('D/MM/YYYY')}, {$inc: {CurrentActiveTime: 1000 * 60 * 10}}, function (err, data) {
            if(err) {
              throw err;
            }
            console.log('number of times');
          })
      }, process.env.TRACKER_INTERVAL_TIME)
    } else {
      clearInterval(interval);
    }
  })
}
app.post('/Login', function(req, res) {
  Employee.findOne({Email: req.body.Email, Password: req.body.Password},function(err, employee) {
    if (err) throw err;
    if (!employee) {
      res.send({success: false, msg: ' check Email or Password.'});
    } else {
      if(employee.Email == req.body.Email || employee.Password == req.body.Password) {
            var token = jwt.sign({employee:employee}, 'Employee_db');
            return res.send({success: true, token: 'JWT ' + token});
          } else {
            res.send({success: false, msg: 'check Email or Password  '});
          }
    }
  });
});

app.get('/checkbox/:id',function (req,res) {
  Employee.findById({_id: req.params.id}, function (err, data) {
    if (err) throw err;
    res.send(data);
  });
});


app.get('/CurrentEmployee/:id',function (req,res) {
/*  if(req.params.id !== undefined ) {
    EmployeeHour.findOne({Empid: req.params.id, Date:moment().format('D/MM/YYYY')}).populate('Empid').exec(function (err, data) {
      if (err) {
        throw err;
      } else {
        res.send(data);
      }
    });
  }*/

  EmployeeHour.aggregate([
    {$match:{$and:[{Empid: mongoose.Types.ObjectId(req.params.id)},{ Date: {$gte: moment().subtract(7,'d').format('D/M/YYYY')} }]}},
    {$group:{
      _id:{Date:"$Date"},
      Total:{$sum:"$CurrentActiveTime" }}},
    {$sort:{"_id.Date":-1}}],function (err,result) {
    if(err) {
      throw  err;
    } else {
      res.send(result);
    }
  })
});


app.get('/GetEmployeeWork',function (req,res) {
  EmployeeHour.aggregate([

/*
    {$match:{$and:[{Date:{$gte:moment().subtract(7,'d').format('D/M/YYYY')}},{Date:{$lte:moment().add(2,'d').format('D/M/YYYY')}}]}},
*/
    {$match:{Date:{$lt: moment().add(2,'d').format('D/M/YYYY')}}},
    {$group:{
      _id:{Date:"$Date", Empid:"$Empid"},
      Total:{$sum:"$CurrentActiveTime"}
    }},
    {$sort:{"_id.Date":-1}}],function (err,data) {
    if(err) {
      throw err
    } else {
      res.send(data);
    }
  })
});

app.delete('/DeletEmployeeWork/:id',function (req,res) {
  EmployeeHour.remove({_id:req.params.id},function (err,data) {
    if(err) {
      throw err;
    } else {
      res.json({success: true, msg: 'Delete Successfully'})
    }
  });
});

app.get('/geteditemployeedata/:id',function (req,res) {
  EmployeeHour.find({_id:req.params.id},function (err,data) {
    if(err) {
      res.send(err);
    } else {
      res.send(data);
    }
  })
});

app.listen(process.env.PORT, function () {
  console.log('connected on port:'+ process.env.PORT);
});





