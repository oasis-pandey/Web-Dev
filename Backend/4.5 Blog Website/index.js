import express from "express"
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let blogsTitle = [];
let blogsContent=[];
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.render("index.ejs",{
        Title : blogsTitle,
        Content : blogsContent
    })
})

app.post("/create", (req,res) => {
    res.render("create.ejs")
})

app.post("/delete",(req,res)=>{
    if(req.body.action == "delete"){
        blogsTitle.splice(req.body.id,1)
        blogsContent.splice(req.body.id,1)
    }
    res.redirect("/")
})

app.post("/post",(req,res)=>{
    blogsTitle.push(req.body.title)
    blogsContent.push(req.body.content)
    res.redirect("/")
})



app.listen(port, ()=> {
    console.log(`Server running on port ${port}.`)
})