import express from "express";

const app = express();
const port = 3000;

app.use(express.json());
let teaData = [];
let nextId = 1;

// post request - to add teas
app.post("/add-teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

// get request to get all teas
app.get("/list-teas", (req, res) => {
  res.status(201).send(teaData);
});

// get teas by id
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea not found");
  } else {
    res.status(201).send(tea);
  }
});

// update the tea
app.put("/update-tea/:id", (req, res) => {
  const teaId = Number(req.params.id);
  const tea = teaData.find((t) => t.id === teaId);

  if (!tea) {
    return res.status(404).send("Tea not found");
  }

  const { name, price } = req.body;

  tea.name = name;
  tea.price = price;

  return res.status(204).send("Tea Updated");
});

app.delete("/delete-tea/:id", (req, res) => {
  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).send("Id not found");
  }

  teaData.splice(index, 1);
  return res
    .status(204)
    .send(`tea having the id ${req.params.id} has been deleted`);
});

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
