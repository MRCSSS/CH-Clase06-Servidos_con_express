const express = require('express');
const Contenedor = require('./src/fileSystem.js');

const app = express();
const cont = new Contenedor('./src/productos.txt');

const port = 8080;

app.get('/productos', async (request, response) => {
    const products = await cont.getAll();

    response.send(products);
});

app.get('/productoRandom', async (request, response) => {
    const products = await cont.getAll();
    const randomID = Math.floor(Math.random() * (Math.floor(products.length) - Math.ceil(1) + 1) + Math.ceil(1));
    console.log('products.length',products.length);
    console.log('randomID',randomID);
    const randomProduct = await cont.getById(randomID);

    response.send(randomProduct);
});

app.get('*', (request, response) => {
    response.send('404 - Page not found!!');
});

const server = app.listen(port, () => {
    console.log(`Servidor http escuchando en http://localhost:${port}/`);
})
