const express = require("express");
const app = express();
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

let items = [];


app.get("/", (req, res) => {
  res.render("list", { exej: items, editIndex: -1, toastMessage: null });
});


app.post("/", (req, res) => {
  const item = req.body.ele1;
  if (item.trim() !== "") {
    items.push(item);
    res.render("list", {
      exej: items,
      editIndex: -1,
      toastMessage: { message: "Task added ✅", type: "success" },
    });
  } else {
    res.render("list", {
      exej: items,
      editIndex: -1,
      toastMessage: { message: "Cannot add empty task ⚠️", type: "error" },
    });
  }
});


app.post("/delete", (req, res) => {
  const index = parseInt(req.body.index);
  items.splice(index, 1);
  res.render("list", {
    exej: items,
    editIndex: -1,
    toastMessage: { message: "Task deleted 🗑️", type: "success" },
  });
});



app.post("/edit-mode", (req, res) => {
  const index = parseInt(req.body.index);
  res.render("list", { exej: items, editIndex: index, toastMessage: null });
});


app.post("/edit", (req, res) => {
  const index = parseInt(req.body.index);
  const newTask = req.body.newTask;
  if (items[index] !== undefined) {
    items[index] = newTask;
  }
  res.render("list", {
    exej: items,
    editIndex: -1,
    toastMessage: { message: "Task updated ✏️", type: "success" },
  });
});





const PORT = process.env.PORT || 8000;
app.listen(PORT, function () {
  console.log("Server Started on port", PORT);
});
