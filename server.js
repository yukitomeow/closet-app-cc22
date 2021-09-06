const knex = require("knex")(require("./knexfile"));
const express = require("express");
const cors = require("cors");//ports confricting 
//importing express

// Importing JSON data
const port = 9991

//setting port number 3000

const app = express();
/* Calls the express function "express()" and puts new Express application 
inside the app variable (to start a new Express application). 
It's something like you are creating an object of a class. 
Where "express()" is just like class and app is it's newly created object.*/

app.use(cors());//middlewear that request arrow to request other server
app.use(express.json());//body にユーザーのリクエストが入ることがある、それをparse suruことでボディの情報を受け取ることができる
//middlewareを指定するもの middleware function (req,res,next)　expressがくれたミドルウエア

const logger = (req, res, next) => {
    console.log("hello!");
    next();//oteseinomonoha next()woyobu 自分で作ったミドルウェア
}

//init middleware
app.use(logger);

app.get("/", (req, res) => {
    // Get method get data
    // https://expressjs.com/ja/api.html#res.send
    res.json({ message: "Hello World!" });//

    //returning Json response
});

app.get("/items", async (req, res) => {
    try {
        const data = await knex("closet").select()
        res.status(200);
        res.send(data);
    } catch (err) {
        console.log(err)
        res.sendStatus(400)
    }
});

app.post("/items", async (req, res) => {
    try {
        const item = req.body
        console.log(item)
        await knex("closet").insert(item)//insert
        res.sendStatus(204);
    } catch (err) {
        console.log(err)
        res.sendStatus(400)
    }
});

app.delete('/items/:id', async (req, res) => {
    try {
        await knex("closet").delete().where({ id: req.params.id })//id: (from DB)
        res.sendStatus(204)
    }
    catch (err) {
        console.log(err)
        res.sendStatus(400)
    }
});

app.patch("/items/:id", async (req, res) => {
    try {
        const myChanges = req.body;
        await knex("closet").update(myChanges).where({ id: req.params.id });
        res.sendStatus(204)
    }
    catch (err) {
        console.log(err)
        res.sendStatus(400)
    }
});



const PORT = process.env.PORT || port;//means: whatever is in the environment variable PORT, or 3000 if there's nothing there.
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
  //app.listenかapp.set('port', ...)で任意のサーバーが環境から特定のパラメーターを指定したPORTから受け取れるようにしてあげる。