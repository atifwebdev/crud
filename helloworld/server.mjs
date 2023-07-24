// import pakages
import express from "express";


// Inotialize express app
const app = express();

// get request from localhost/3000
app.get("/", (req, res) =>{
    console.log("🚀 ~ file: server.mjs:7 ~ app.get ~ req:");
    res.send({ message: "Hello World! by Atif1" });
});

// passing params
app.get("/name/:myName", (req, res) =>{
    const name = req.params.myName;
    console.log("🚀 ~ file: server.mjs:7 ~ app.get ~ req:", name);
    res.send({ message: `New Hello World! by ${name}` });
});

const port = process.env.PORT || 3000;
// app is listening from here
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});