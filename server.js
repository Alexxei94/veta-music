const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const config = require("config");

const app = express();

// Bodyparser middleware
app.use(express.json());

// DB config
const db = config.get("mongoURI");

// Connect to mongo
mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("ERROR", err));

app.use(cors());
app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

// for production
// if(process.env.NODE_ENV === "production"){
//     app.use(express.static("client/build"));

//     app.get("*", (req, res)=>{
//         res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
//     })
// }

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
