// HINTS:
// 1. Import express and axios

// 2. Create an express app and set the port number.

// 3. Use the public folder for static files.

// 4. When the user goes to the home page it should render the index.ejs file.

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

// 6. Listen on your predefined port and start the server.
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))

app.get("/",async(req,res)=>{
    try{
        const response = await axios.get("https://secrets-api.appbrewery.com/random");
        const user_secret = JSON.stringify(response.data.secret);
        const user_name = JSON.stringify(response.data.username);
        res.render("index.ejs",{
            secret : user_secret,
            user : user_name
        })
    }catch(error){
        console.log(error.response.data);
        res.status(500)
    }
})


app.listen(port,()=> {
    console.log(`Server running on port ${port}.`)
})
