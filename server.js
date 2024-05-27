const express = require('express')
const app = express();
const db = require('./db');

require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
///------hide port env online db git----
const PORT = process.env.PORT || 3000;
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