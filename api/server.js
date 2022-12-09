const express =  require("express");
const cors = require("cors")

const app = express();

var corOptions= {
  origin: "http://localhost:3000"
}


// middleware
app.use(cors(corOptions))

app.use(express.json())

app.use(express.urlencoded({extended: true}))

// Sequelize initialization

const db = require("./models");
const Role = db.role;

db.sequelize.sync({force: false})
.then(() => {
    console.log('re-sync done')
})

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "admin"
  });
}
// routers

const authrouter = require('./routes/authRouter.js')
app.use('/auth', authrouter)
const userrouter = require('./routes/userRouter.js')
app.use('/user', userrouter)
const articlerouter = require('./routes/articleRouter.js')
app.use('/article', articlerouter)
const categoryrouter = require('./routes/categoryRouter.js')
app.use('/category', categoryrouter)
const LikeFavrouter = require('./routes/likeFavRouter.js')
app.use('/likeFav', LikeFavrouter)
const commentrouter = require('./routes/commentRouter.js')
app.use('/comment', commentrouter)


// test api

app.get('/', (req,res) => {
  res.json({ message: "hello world" })
})

//port
const PORT = process.env.PORT || 8080

// server

app.listen(PORT, ()=> {
  console.log(`Api is running on port ${PORT}`)
})