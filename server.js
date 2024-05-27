const express = require('express')
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

//--------Person------------
const personRoutes = require('./Routes/personRoutes')
app.use('/person',personRoutes);

//---------Menu-------------
const menuRoutes = require('./Routes/menuRoutes');
app.use('/menu',menuRoutes);

//-----------server-----------
app.listen(3000, () => {
  console.log("server is on 3000");
});