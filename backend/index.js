// entry point of the application
// this index.js will be an express server

const connectToMongo = require('./db');
const express = require('express');  // requiring express 
// express is a web framework for nodejs which has all the tools which makes our backend development easier.
connectToMongo();

const app = express();
const port = 3000;


// // Middleware
// app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello Rudresh!'); 
  // res.send('<h1>Hey<h1>'); 
  // res.send('<h1>Hey<h1>'); 
}); 

// But we won't make our routes like this because this way the code will get messy
// app.get('/api/v1/login', (req, res) => {
//   res.send('Hello login!'); 
// }); 

// app.get('/api/v1/signup', (req, res) => {
//   res.send('Hello signup!'); 
// }); 


// // More Available routes:
app.use('/api/auth', require('./routes/auth')); // making route
app.use('/api/notes', require('./routes/notes')); // making route



app.listen(port, ()=> {
  console.log(`Example app listening at http://localhost:${port}`);
});
