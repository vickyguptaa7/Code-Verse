import express from 'express';
const port = 8000;

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.listen(port, () => {
    console.log(`now listending on port ${port}`);
})