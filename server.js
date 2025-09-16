const express = require("express"); //lets use use express
const app = express(); //creates app
app.set("view engine", "ejs"); //use expressjs

app.use(express.urlencoded({ extended: true })); //required to read POST requests

let blogPosts = []; //array to store posts, viewed on main page of site (which for me is index.ejs

app.get("/", (req, res) => res.render("index", { blogPosts })); //renders index.ejs (main blog page)

app.post("/newPost", (req, res) => { //actually captures data and creates post from input data once button is pressed, also creates an ID for that post
	blogPosts.push({ author: req.body.author,
	title: req.body.title,
	content: req.body.content,
	date: new Date()});
	res.redirect("/"); //refreshes page
});

app.get("/delete/:id", (req, res) => { //deletes post when button is pressed based on ID
	blogPosts.splice(req.params.id, 1);
	res.redirect("/");
});

app.get("/edit/:id", (req, res) => { //shows the edit form for the one who clicked the edit button
	res.render("edit", { post: blogPosts[req.params.id], id: req.params.id });
});
app.post("/edit/:id", (req, res) => { //actually handes the editting of the previous post, once the editor clicks save on new data
	blogPosts[req.params.id] = { 
	title: req.body.title, 
	content: req.body.content, 
	author: req.body.author, 
	date: new Date() };
	res.redirect("/");
});
app.listen(3000, () => console.log("Running on http://localhost:3000")); //start the server
