import express from "express";
import {dirname} from "path"
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));

let app = express();
const port = 3000
app.use(express.static(path.join(__dirname, "../public")));
app.use(bodyParser.urlencoded({extended: true}))

let checkUser = (req,res,next) => {
    if (req.body.username == "oasis" && req.body.password == "oasis4238k") req.isAuthorized = true;
    next()
}


app.get("/",(req,res)=> {
    res.sendFile(__dirname + "/../public/index.html")
})

app.post("/login",checkUser,(req,res)=> {
    if(req.isAuthorized) res.sendFile(path.resolve(__dirname, "../public/homepage.html"));
    else {
        res.redirect("/")
    }
})

app.listen(port,()=> {
    console.log(`Server running on port ${port}.`)
})