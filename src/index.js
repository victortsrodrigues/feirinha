import express, { json } from "express";

const app = express(); // cria o servirdor
app.use(json()); // no POST o body vem como json e não como string



app.listen(5000, () => {
  console.log("Application running on server 5000");
})