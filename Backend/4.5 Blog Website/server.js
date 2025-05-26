import express from "express"
import bodyParser from "body-parser";
import livereload from "livereload";
import connectLiveReload from "connect-livereload"

const app = express();
const port = 3000;
let isEditing = false;


// Live Reloader to reload page automatically when CSS file is changed.
const liveReloadServer = livereload.createServer();
liveReloadServer.watch("public");
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
app.use(connectLiveReload());


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
    isEditing = false;
    res.render("create.ejs",{
        edit : isEditing,
        Title : blogsTitle,
        Content : blogsContent
    })
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

app.post("/view",(req,res)=>{
    if(req.body.action == "view"){
        let mytitle = (blogsTitle[req.body.id])
        let mycontent = (blogsContent[req.body.id])
        res.render("view.ejs",{
            Title:mytitle,
            Content:mycontent,
    })
    }
})

app.get("/goHome",(req,res)=>{
    res.redirect("/")
})

app.post("/edit",(req, res) => {
    if(req.body.action == "edit"){
        let mytitle = (blogsTitle[req.body.id])
        let mycontent = (blogsContent[req.body.id])
        isEditing = true;
        res.render("create.ejs",{
            Title:mytitle,
            Content:mycontent,
            edit : isEditing
    })
    blogsTitle.splice(req.body.id,1)
    blogsContent.splice(req.body.id,1)
    }
})



app.listen(port, ()=> {
    console.log(`Server running on port ${port}.`)
})