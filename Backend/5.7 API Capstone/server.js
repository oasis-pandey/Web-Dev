import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}))

app.get("/", async (req,res)=>{
    const response = await axios.get("https://icanhazdadjoke.com/",{
        headers : {
            "Accept" : "application/json"
        }
    })
    const result = JSON.stringify(response.data.joke);
    res.render("index.ejs",{
        joke : result
    })
})

app.post("/next",(req,res)=>{
    res.redirect("/");
})

app.listen(port,()=>{
    console.log(`Server running on port ${port}.`)
})