const express = require('express');
const app = express();
const Pokemon = require('./models/pokemon');

// PORT
PORT = process.env.PORT || 3000

app.use(express.urlencoded())
const methodOverride = require("method-override")

//-----------------MPA--------------------
// INDEX
app.get('/', (req, res) => {
    res.render('index.ejs', { data: Pokemon });
});

// NEW
app.get('/new', (req, res) => {
    res.render('new.ejs');
});

// SHOW
app.get('/:index', (req, res) => {
    res.render('show.ejs', { data: Pokemon[req.params.index], index:req.params.index, length:Pokemon.length-1});
});

// EDIT
app.get('/edit/:index', (req, res) => {
    const { index } = req.params
    res.render('edit.ejs', { data: Pokemon[index], index:index});
});

//-----------------CRUD--------------------
// CREATE
app.post('/', (req, res) => {
    req.body.id=Number(Pokemon[Pokemon.length-1].id)+1
    req.body.type = req.body.type.split(",")
    Pokemon.push(req.body)
    console.log(req.body)
    res.redirect('/')
});

// UPDATE
app.use(methodOverride("_method"))
app.put('/:id/:index', (req, res) => {
    const { id, index } = req.params
    req.body.id=id
    req.body.type = req.body.type.split(",")
    Pokemon[index]=req.body
    console.log(req.body)
    res.redirect('/')
});

// DELETE
app.delete('/:index', (req, res) => {
    const { index } = req.params
    Pokemon.splice(index,1)
    res.redirect('/')
});

app.listen(PORT, () => { console.log('listening at PORT: ', PORT) })