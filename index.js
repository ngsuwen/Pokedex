const express = require('express');
const app = express();
const Pokemon = require('../pokedex/pokemon');
const pokemonFiltered=Pokemon.slice(0,100)
// PORT
PORT = process.env.PORT || 3000

app.use(express.urlencoded())
const methodOverride = require("method-override")
//-----------------MPA--------------------
// INDEX
app.get('/', (req, res) => {
    res.render('index.ejs', { data: pokemonFiltered });
});

// NEW
app.get('/new', (req, res) => {
    res.render('new.ejs');
});

// SHOW
app.get('/:index', (req, res) => {
    res.render('show.ejs', { data: pokemonFiltered[req.params.index], index:req.params.index, length:pokemonFiltered.length-1});
});

// EDIT
app.get('/edit/:index', (req, res) => {
    const { index } = req.params
    res.render('edit.ejs', { data: pokemonFiltered[index], index:index});
});

//-----------------CRUD--------------------
// CREATE
app.post('/', (req, res) => {
    req.body.id=Number(pokemonFiltered[pokemonFiltered.length-1].id)+1
    req.body.type = req.body.type.split(",")
    pokemonFiltered.push(req.body)
    console.log(req.body)
    res.redirect('/')
});

// UPDATE
app.use(methodOverride("_method"))
app.put('/:id/:index', (req, res) => {
    const { id, index } = req.params
    req.body.id=id
    req.body.type = req.body.type.split(",")
    pokemonFiltered[index]=req.body
    console.log(req.body)
    res.redirect('/')
});

// DELETE
app.delete('/:index', (req, res) => {
    const { index } = req.params
    pokemonFiltered.splice(index,1)
    res.redirect('/')
});

app.listen(PORT, () => { console.log('listening at PORT: ', PORT) })