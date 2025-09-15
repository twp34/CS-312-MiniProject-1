const express = require("express");
const app = express();
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

let posts = [];

app.get("/", (req, res) => res.render("index", { posts }));

app.post("/new", (req, res) => {
  posts.push({
    author: req.body.author,
    title: req.body.title,
    content: req.body.content,
    date: new Date()
  });
  res.redirect("/");
});


app.get("/delete/:id", (req, res) => {
  posts.splice(req.params.id, 1);
  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  res.render("edit", { post: posts[req.params.id], id: req.params.id });
});

app.post("/edit/:id", (req, res) => {
  posts[req.params.id] = { title: req.body.title, content: req.body.content, date: new Date() };
  res.redirect("/");
});

app.listen(3000, () => console.log("Running on http://localhost:3000"));
