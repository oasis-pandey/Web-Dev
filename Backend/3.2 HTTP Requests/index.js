import express from "express"
const app = express()
const port = 3000

app.get("/",(req, res) => {
    res.send("Hello")
})

app.get("/about",(req,res)=>{
    res.send("<h1> This is about me. </h1>")
})

app.get("/contact", (req, res) => {
    res.send("<h1> This is contact page. </h1>")
})

app.listen(port,()=>{
    console.log(`Server running on port ${port}.`)
})