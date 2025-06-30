import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
    user : "postgres",
    host : "localhost",
    database : "world",
    password : "4238",
    port : 5432
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", async (req, res) => {
  //Write your code here.
  let countryCode = [];
  const result = await db.query(
    "SELECT country_code FROM visited_countries"
);
    result.rows.forEach((code) => {
        countryCode.push(code.country_code)
    })
    res.render("index.ejs" , {countries : countryCode , total : result.rows.length })
});

app.post("/add" , async(req,res) => {
    const country = req.body.country;
    const result = await db.query(
    "SELECT country_code FROM countries WHERE country_name = $1",[country]
);
     if (result.rows.length !== 0) {
    const data = result.rows[0];
    const countryCode = data.country_code;

    await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [
      countryCode,
    ]);
    res.redirect("/");
  }
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
