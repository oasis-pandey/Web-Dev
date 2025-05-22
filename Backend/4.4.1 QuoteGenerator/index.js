import express from "express"
import bodyParser from "body-parser";

const app = express();
const port = 3000

app.use(bodyParser.urlencoded({extended: true}))

app.get("/",(req,res) => {
    res.render("index.ejs")
})

let favorites = []
let randQuote = ""



app.post("/next",(req,res)=>{
    if(req.body.action == "nextQuote"){
        randQuote = quotes[Math.floor(Math.random() * quotes.length)]
        res.render("index.ejs",  {
            randomQuote : randQuote,
            favoriteQuotes : favorites
        })
    }else if (req.body.action == "addToFavorites"){
        favorites.push(randQuote)
        res.render("index.ejs", {
            randomQuote : randQuote,
            favoriteQuotes : favorites
        })
    }else if (req.body.action == "viewFavorites"){
        res.render("favorite.ejs",{
            randomQuote : randQuote,
            favoriteQuotes : favorites
        })
    }else{
        res.redirect("/")
    }
})

app.post("/clear",(req,res) => {
    favorites = []
    res.redirect("/")
})



app.listen(port,()=> {
    console.log(`Server started on port ${port}.`)
})




const quotes = [
  "Do or do not. There is no try. – Yoda",
  "In the middle of every difficulty lies opportunity. – Albert Einstein",
  "Life is what happens when you're busy making other plans. – John Lennon",
  "The only way to do great work is to love what you do. – Steve Jobs",
  "Believe you can and you're halfway there. – Theodore Roosevelt",
  "What we think, we become. – Buddha",
  "Strive not to be a success, but rather to be of value. – Albert Einstein",
  "I have not failed. I've just found 10,000 ways that won't work. – Thomas Edison",
  "Everything you can imagine is real. – Pablo Picasso",
  "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill",
  "The best way to predict the future is to invent it. – Alan Kay",
  "Dream big and dare to fail. – Norman Vaughan",
  "Don’t watch the clock; do what it does. Keep going. – Sam Levenson",
  "A person who never made a mistake never tried anything new. – Albert Einstein",
  "An unexamined life is not worth living. – Socrates",
  "Your time is limited, so don’t waste it living someone else’s life. – Steve Jobs",
  "The mind is everything. What you think you become. – Buddha",
  "Act as if what you do makes a difference. It does. – William James",
  "It does not matter how slowly you go as long as you do not stop. – Confucius",
  "Our greatest glory is not in never falling, but in rising every time we fall. – Confucius",
  "Happiness is not something ready made. It comes from your own actions. – Dalai Lama",
  "You miss 100% of the shots you don't take. – Wayne Gretzky",
  "Change your thoughts and you change your world. – Norman Vincent Peale",
  "The harder the conflict, the more glorious the triumph. – Thomas Paine",
  "What lies behind us and what lies before us are tiny matters compared to what lies within us. – Ralph Waldo Emerson",
  "Life is either a daring adventure or nothing. – Helen Keller",
  "Knowing is not enough; we must apply. Willing is not enough; we must do. – Bruce Lee",
  "It always seems impossible until it is done. – Nelson Mandela",
  "You only live once, but if you do it right, once is enough. – Mae West",
  "Work hard in silence, let success make the noise. – Frank Ocean",
  "The future belongs to those who believe in the beauty of their dreams. – Eleanor Roosevelt",
  "Keep your face always toward the sunshine—and shadows will fall behind you. – Walt Whitman",
  "Turn your wounds into wisdom. – Oprah Winfrey",
  "Do one thing every day that scares you. – Eleanor Roosevelt",
  "Opportunities don't happen. You create them. – Chris Grosser",
  "Success usually comes to those who are too busy to be looking for it. – Henry David Thoreau",
  "If you are not willing to risk the usual, you will have to settle for the ordinary. – Jim Rohn",
  "Don't be afraid to give up the good to go for the great. – John D. Rockefeller",
  "I find that the harder I work, the more luck I seem to have. – Thomas Jefferson",
  "Don’t limit your challenges. Challenge your limits. – Jerry Dunn",
  "Don’t wish it were easier. Wish you were better. – Jim Rohn",
  "Success is walking from failure to failure with no loss of enthusiasm. – Winston Churchill",
  "The way to get started is to quit talking and begin doing. – Walt Disney",
  "If you can dream it, you can achieve it. – Zig Ziglar",
  "All our dreams can come true, if we have the courage to pursue them. – Walt Disney",
  "Do what you can with all you have, wherever you are. – Theodore Roosevelt",
  "If opportunity doesn’t knock, build a door. – Milton Berle",
  "Be yourself; everyone else is already taken. – Oscar Wilde",
  "You are never too old to set another goal or to dream a new dream. – C.S. Lewis",
  "Start where you are. Use what you have. Do what you can. – Arthur Ashe"
];
