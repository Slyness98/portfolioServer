const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
app.use(express.json());
app.use(cors());

// const urlencodedParser = express.urlencoded({ extended: false });
// app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({
    extended: true
}))

app.listen(5000, () => {
  console.log("server running on port 5000")
});

app.get("/", (req,res) => {res.send('this is working')})
app.post("/contact", (req,res) => {
    let data = req.body.current;
    console.log(`Hi there ${data.firstName} at ${data.email}. You sent me a message ${data.message}`) 
    res.send(req.body);
    // res.render('contact', {qs: req.query})
    res.end(); 
})