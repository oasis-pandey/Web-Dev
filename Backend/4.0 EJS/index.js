import express from "express";

const app = express()
const port = 3000



app.get("/",(req,res) => {
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay();
    if(dayOfWeek == 0 || dayOfWeek == 6){
        res.render("index.ejs",{
            dayType : "a Weekend",
            advice : "it's time to chill out"
        })
    }else{
         res.render("index.ejs",{
            dayType : "a Weekday",
            advice : "it's time to work hard"
        })       
    }
})

app.listen(port, () =>{
    console.log(`Server started on port ${port}.`)
})
