const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// Config for Env Variables
dotenv.config();

// Use Default Port or 80 (for heroku)post
const port = process.env.PORT || 80;

// Default Data for Pages
const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://admin-derek:" +
    `${process.env.MONGO_PASS}` +
    "@blog.z743bx8.mongodb.net/blogDB",
  { useNewUrlParser: true }
);

// Schema for Posts
const postSchema = {
  title: String,
  content: String,
};

// Model for Posts
const Post = mongoose.model("Post", postSchema);

// Home Page (Request)
app.get("/", function (req, res) {
  // Find Posts in Database
  Post.find({}, function (err, posts) {
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts,
    });
  });
});

// Compose Page (Request)
app.get("/compose", function (req, res) {
  res.render("compose");
});

// Compose Page "Post" (Request)
app.post("/compose", function (req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
  });
  //   Save New Posts when Posted
  post.save(function (err) {
    if (!err) {
      res.redirect("/");
    }
  });
});

// Posts Page based on thier ID
app.get("/posts/:postId", function (req, res) {
  // Fetch Requested Post ID
  const requestedPostId = req.params.postId;
  // Find and Render the Requested Post
  Post.findOne({ _id: requestedPostId }, function (err, post) {
    res.render("post", {
      title: post.title,
      content: post.content,
    });
  });
});

// About Page (Request)
app.get("/about", function (req, res) {
  res.render("about", {
    aboutContent: aboutContent,
  });
});
// Contact Page (Request)
app.get("/contact", function (req, res) {
  res.render("contact", {
    contactContent: contactContent,
  });
});

app.listen(port, function () {
  console.log("Server is started at http://localhost:" + port);
});
