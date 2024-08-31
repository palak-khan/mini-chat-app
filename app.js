const express = require("express");
const app = express();
const path = require('path')
const indexRouter = require("./routes/index");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.listen(3000, () => {
  console.log("Running on http://localhost:3000/");
});
