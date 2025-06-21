import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let prompt;

app.use(bodyParser.urlencoded({extended:true}))
const GEMINI_API_KEY = "AIzaSyC5oehxth5wlqlfcPj3taHkphxNiZljBew";

app.get("/", async (req,res)=>{
    const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
  "contents": [
    {
      "parts": [
        {
          "text": `I am going to tell you the name of a dish and you will need to give me with all the necessary ingredients in a bullet point. Just list the most top 5 common ingredients along with a short recipe afterwards. Here is the food: ${prompt}`
        }
      ]
    }
  ]
},
        {
        headers : {
            "Content-Type" : "application/json"
        }
    })
    let result = JSON.stringify(response.data.candidates[0].content.parts[0].text);
    result = result.replace(/\n/g , '<br>')
    console.log(result);
    res.render("index.ejs",{response : result})
})

app.post("/submit",(req,res)=>{
    prompt = req.body.type[0];
    res.redirect("/")
})


app.listen(port,()=>{
    console.log(`Server running on port ${port}.`)
})