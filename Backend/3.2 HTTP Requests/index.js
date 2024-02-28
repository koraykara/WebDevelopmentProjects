import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("<h1>Hello</h1>");
    console.log(req.rawHeaders);
});

app.get("/contact", (req, res) => {
    res.send("<h1>Contact Me</h1><p>Phone: +90 094903 90432 04 34</p>");
    console.log(req.rawHeaders);
});

app.get("/about", (req, res) => {
    res.send("<h1>About Me</h1><p>My name is Koray</p>");
    console.log(req.rawHeaders);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
}); 