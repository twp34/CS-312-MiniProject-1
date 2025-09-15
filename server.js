const express = require("express");
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Temporary array for blog posts
let posts = [];

// Home route
app.get("/", (req, res) => {
    res.render("index", { posts });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.post("/new", (req, res) => {
    const { title, content } = req.body;
    const newPost = {
        postTitle,
        postContent,
        date: new Date()
    };
    posts.push(newPost);
    res.redirect("/");

});

app.get("/delete/:id", (req, res) => {
    const id = parseInt(req.params.id);
    if (!isNaN(id) && posts[id]) {
        posts.splice(id, 1); // remove post at that index
    }
    res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts[id];
    if (post) {
        res.render("edit", { post, id });
    } else {
        res.redirect("/");
    }
});

app.post("/edit/:id", (req, res) => {
    const id = parseInt(req.params.id);
    if (!isNaN(id) && posts[id]) {
        posts[id].title = req.body.title;
        posts[id].content = req.body.content;
        posts[id].date = new Date(); // optional: update timestamp
    }
    res.redirect("/");
});
