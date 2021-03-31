const express = require("express");
const cors = require("cors");
const path = require("path");
const contactRoute = require("./routes/contact.route");

const app = express();
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

app.use("/contact", contactRoute);