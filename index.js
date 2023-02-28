require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const fruits = require('./fruits');

app.use(express.json());

//Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/fruits', (req, res) => {
    res.send(fruits);
});

const getFruit = (name) => {
    return fruits.find((fruit) => fruit.name.toLowerCase() == name);
};

const getMaxID = () => {
    const ids = fruits.map((fruit) => fruit.id);
    return Math.max(...ids);
};

app.get('/fruits/:name', (req, res) => {
    const name = req.params.name.toLowerCase();
    const fruit = getFruit(name);
    if (fruit == undefined) {
        res.status(404).send();
    } else {
        res.send(fruit)
    }
});

app.post('/fruits', (req, res) => {
    //Check if fruit already exists
    const fruit = getFruit(req.body.name.toLowerCase());

    if (fruit != undefined) {
        res.status(409).send();
    } else {
        let maxId = getMaxID(); + 1;
        req.body.id = maxId;
        fruits.push(req.body);
        res.status(201).send(req.body);
    }
});

app.delete('/fruits/:name', (req, res) => {
    const name = req.params.name.toLowerCase();
    const fruit = getFruit(name);
    const fruitIndex = fruits.indexOf(fruit);
    if (fruitIndex == -1) {
        res.status(404).send();
    } else {
        fruits.splice(fruitIndex, 1);
        res.status(204).send();
    }
});

app.get('/elephant', (req, res) => {
    res.status(404).send();;
});

app.get('/elephant/:name&:age', (req, res) => {
    res.send(req.params);
});

app.get('/elephant/:name', (req, res) => {
    res.send(req.query);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});