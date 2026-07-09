import express from "express";
import bodyParser from "body-parser";
import 'dotenv/config';
import pg from "pg";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
const saltRounds = 10;
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "firstdb",
  password: process.env.PGPASSWORD,
  port: 5432,
});
db.connect()
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser())


app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/secrets", authenticateToken, (req, res) => {
    res.render("secrets.ejs");
});
app.post("/register",(req, res) => {
  const email=req.body.username;
  const password=req.body.password;
  bcrypt.hash(password,saltRounds, async (err,hash)=>{
    if (err) {
      console.log(err)
    }
    try {
      const addQuery=await db.query("INSERT INTO users (email,password_hash) VALUES ($1,$2) RETURNING id,email;",[email,hash])
      const accessToken=jwt.sign(addQuery.rows[0], process.env.ACCESS_TOKEN,{ expiresIn: '1d' })
      res.cookie("token",accessToken)
    } catch (error) {
      console.log(error)
    }

   
  })
});

app.post("/login", async (req, res) => {
  const email=req.body.username;
  const password=req.body.password;
  const userInfo=await db.query("SELECT * FROM users WHERE email=$1",[email])
  const userInfoJson=userInfo.rows[0]
  bcrypt.compare(password,userInfoJson.password_hash,(err,result)=>{
    if(result===true){
      const accessToken=jwt.sign({id:userInfoJson.id,email:userInfoJson.email}, process.env.ACCESS_TOKEN,{ expiresIn: '1d'})
      res.cookie("token",accessToken)
      res.redirect("/secrets")
    }else{
      res.send("Incorrect Password")
    }
    if(err){
      res.send("Issue Authetcating the user")
    }
  })
});

function authenticateToken(req,res,next) {
  const authToken=req.cookies.token;
 if (!authToken) {
        return res.status(401).send("Unauthorized");
    }
    try {
        req.user = jwt.verify(authToken, process.env.ACCESS_TOKEN);
        next();
    } catch {
        return res.status(401).send("Unauthorized");
    }
  
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
