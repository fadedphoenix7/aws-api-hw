const Express = require('express');
require('dotenv').config();

// import routes
const routeProf = require('./routes/profesores');
const routeAlum = require('./routes/alumnos');

const app = Express();

app.use(Express.json()) 
app.use(Express.urlencoded({ extended: true })) 

app.use('/profesores', routeProf);
app.use('/alumnos', routeAlum);

app.get("/", (req, res) => {
  res.send("Hi");
});

app.get('*', (req, res) => {
  res.send('No exist route', 404);
});

app.listen(process.env.PORT, () => {
  console.log(process.env.PORT);
});
