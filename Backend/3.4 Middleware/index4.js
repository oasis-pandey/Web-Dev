import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";


const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
app.use(express.urlencoded({extended: true}))
let bandName = ""

let bandNameGenerator = (req,res,next) => {
    bandName = `${req.body.street + req.body.pet}`
    next()
}
app.use(bandNameGenerator)

app.get("/",(req,res) => {
    res.sendFile(__dirname + "/public/index.html")
})



app.post("/submit", (req,res) => {
    res.send(`<h1> YOUR BAND NAME IS: <br>

        ${bandName}</h1>`)
})


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
