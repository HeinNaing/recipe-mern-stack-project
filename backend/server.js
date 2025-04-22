const express = require("express");
const  mongoose = require("mongoose");
require('dotenv').config({ path: './config.env' });
const app = express();  
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const recipesRoutes = require("./routes/recipes");
const usersRoutes = require('./routes/users');
const AuthMiddleware = require("./middlewares/AuthMiddleware");
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
//Database connection
const db_url = process.env.DB_URL.replace(
  '<PASSWORD>',
  process.env.DB_PASSWORD
);
console.log(db_url);
mongoose
  .connect(db_url)
  .then(() => {
    console.log('connected to database');
    app.listen(process.env.PORT, () => {
      console.log('port is listening on ' + process.env.PORT);
    });
  })
  .catch((err) => console.log(err));

//Middleware
app.use(morgan('dev'));
app.use('/api/recipes', AuthMiddleware, recipesRoutes);
app.use('/api/user', usersRoutes);

app.get("/" , (req, res) => {
  res.send("hello world")
})
