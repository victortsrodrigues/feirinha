import express, { json } from "express";

const app = express(); // cria o servirdor
app.use(json()); // no POST o body vem como json e não como string

const list = [];

app.post("/items", (req, res) => {
  const item = req.body;
  console.log(item)
  if(!item.name || !item.quantity || !item.type) {
    return res.sendStatus(422);
  }
  if(list.find(elemento => elemento.name.toLowerCase() === item.name.toLowerCase())) {
    return res.sendStatus(409);
  }
  list.push({
    id: list.length + 1,
    ...item
  })
  console.log(list)
  res.sendStatus(201);
})

app.listen(5000, () => {
  console.log("Application running on server 5000");
})