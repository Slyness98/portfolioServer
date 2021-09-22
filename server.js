const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const contactRoute = require("./routes/contact.route");
const dotenv = require("dotenv");
dotenv.config();

app.set("trust proxy", 1);
app.use(express.json());
app.use(cors());

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname+'client/build/index.html'));
  })
} else {
  app.use(express.static(path.join(__dirname, "client/public")));
}

app.use(express.urlencoded({
  extended: false
}));

//PATHS DEFINED BY IMPORTED ROUTER INSTANCES 
app.use("/contact", contactRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server running on port ${port}`)
});