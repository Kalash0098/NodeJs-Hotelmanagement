const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();
const bodyParser = require('body-parser');
const passport = require('./auth');

//----------to convert json object to understandable object-------
app.use(bodyParser.json());
///------hide port env online db git----
const PORT = process.env.PORT || 3000;

//----Middlewear configuration day and time when url was clicked---

const logRequest = (req,res,next) => {
  console.log(`${new Date().toLocaleString()} Request Made to : ${req.originalUrl}`);
  next();
}
app.use(logRequest);

//------username and password auth ------
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session: false})

//--welcome---
app.get('/',localAuthMiddleware,function(req,res){
  res.send('Welcome to our hotel');
})
//--------Person------------
const personRoutes = require('./Routes/personRoutes')
app.use('/person',personRoutes);

//---------Menu-------------
const menuRoutes = require('./Routes/menuRoutes');
app.use('/menu',menuRoutes);

//-----------server-----------

app.listen(PORT, () => {
  console.log("server is on 3000");
});