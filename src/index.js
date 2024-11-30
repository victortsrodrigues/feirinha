import express, { json } from "express";
import httpStatus from "http-status";

const app = express(); // cria o servirdor
app.use(json()); // no POST o body vem como json e não como string

const list = [];

app.post("/items", (req, res) => {
  const item = req.body;
  if (!item.name || !item.quantity || !item.type) {
    return res.sendStatus(httpStatus.UNPROCESSABLE_ENTITY);
  }
  if (list.find(element => element.name.toLowerCase() === item.name.toLowerCase())) {
    return res.sendStatus(httpStatus.CONFLICT);
  }
  list.push({
    id: list.length + 1,
    ...item
  })
  res.sendStatus(httpStatus.CREATED);
})

app.get("/items", (req, res) => {
  const { type } = req.query;
  if(type) {
    const itemType = list.filter(element => {
      return element.type.toLowerCase() === type.toLowerCase();
    })
    return res.send(itemType);
  }
  res.send(list);
})

app.get("/items/:id", (req, res) => {
  const id = req.params.id;
  if(Number(id) > 0) {
    const itemId = list.find(element => element.id === Number(id))
    if(!itemId) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.send(itemId);
  }
  res.sendStatus(httpStatus.BAD_REQUEST);
})

app.listen(5000, () => {
  console.log("Application running on server 5000");
})