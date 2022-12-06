const Express = require('express');
require('dotenv').config();
const path = require("path");

// import routes
const routeProf = require('./routes/profesores');
const routeAlum = require('./routes/alumnos');
const routeLambda = require('./routes/lambda');

const app = Express();

app.use(Express.json()) 
app.use(Express.urlencoded({ extended: true })) 

app.use('/profesores', routeProf);
app.use('/alumnos', routeAlum);
app.use('/lambda', routeLambda);

app.get("/", (req, res) => {
  res.send("Hi");
});

app.get('*', (req, res) => {
  res.send('No exist route', 404);
});

app.listen(process.env.PORT, () => {
  console.log(process.env.PORT);
});
