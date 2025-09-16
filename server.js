const express = require("express"); //lets use use express
const server = express(); //creates the server for express
server.set("view engine", "ejs"); //use expressjs
server.use(express.urlencoded({ extended: true })); //required to read POST requests

let blogPosts = []; //array to store posts, viewed on main page of site

server.get("/", (request, response) => response.render("index", { blogPosts })); //sends blogPosts data to index.ejs

server.post("/addPostToBlog", (request, response) => { //actually captures data and creates post from input data once button is pressed, also creates an ID for that post
	blogPosts.push({ author: request.body.author,
	title: request.body.title,
	content: request.body.content,
	date: new Date()});
	response.redirect("/"); //refreshes page
});

server.get("/deletePostFromBlog/:postIDnumber", (request, response) => { //deletes post when button is pressed based on ID (res)
	blogPosts.splice(request.params.postIDnumber, 1);
	response.redirect("/");
});

server.get("/editPost/:postIDnumber", (request, response) => { //shows the edit form for the one who clicked the edit button
	response.render("edit", { post: blogPosts[request.params.postIDnumber], id: request.params.postIDnumber });
});


server.post("/editPost/:postIDnumber", (request, response) => { //actually handes the editting of the previous post, once the editor clicks save on new data
	blogPosts[request.params.postIDnumber] = { 
	title: request.body.title, 
	content: request.body.content, 
	author: request.body.author, 
	date: new Date() };
	response.redirect("/");
});

server.listen(3000, () => console.log("Running on http://localhost:3000")); //start the server
