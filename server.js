const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const cors = require("cors");
const path = require("path");
const contactRoute = require("./routes/contact.route");
const dotenv = require("dotenv");
dotenv.config();

// CONFIG & BOILERPLATE
// const app = express();
app.set("trust proxy", 1);
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "client/public")));
app.use(express.urlencoded({
  extended: false
}));
app.listen(5000, () => {
  console.log("server running on port 5000")
});
app.get("/", (req, res) => {res.send('this is working')});

io.on('connection', function(socket) {
  console.log('A user connected');

  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
     console.log('A user disconnected');
  });
});

//ATTACH SOCKET.IO TO REQUST OBJECT AS MIDDLEWARE FOR USE BY ANY ROUTE
app.use((req, res, next) => {
  req.io = io;
  next();
})

//PATHS DEFINED BY IMPORTED ROUTER INSTANCES 
app.use("/contact", contactRoute);