const fs = require('fs');

class Contenedor {
    constructor(path) {
        this.path = path
    }

    // Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
    // Incorporará al producto un id numérico, que deberá ser siempre uno más que el id del último objeto agregado (o id 1 si es el primer objeto que se agrega) y no puede estar repetido.
    async save(object) {
        try {
            const objects = await this.getAll();
            let newID;
    
            if (objects[objects.length-1]?.id && objects[objects.length-1].id !== '') {
                newID = objects[objects.length-1].id+1;
            } else {
                newID = 1;
            }
    
            const newObj = {...object, id:newID};
            objects.push(newObj);
            await fs.promises.writeFile(this.path, JSON.stringify(objects, null, 2));

            return newID;
        } catch (error) {
            console.log('Error al guardar: ',error)
        }
    }
    
    // Recibe un id y devuelve el objeto con ese id, o null si no está.
    async getById(id) {
        try {
            const objects = await this.getAll();
            const filteredObj = objects.filter(obj => obj.id === id)
            return filteredObj != '' ? filteredObj : "Product doesn't found"
        } catch (error) {
            console.log('Error getById: ',error)
        }
    }
    
    // Devuelve un array con los objetos presentes en el archivo.
    async getAll() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.log('Error al leer el archivo');
            return [];
        }
    }

    // Elimina del archivo el objeto con el id buscado.
    async deleteById(id) {
        try {
            const objects = await this.getAll();
            const filteredObj = objects.filter(obj => obj.id !== id);
            filteredObj !== '' ? await fs.promises.writeFile(this.path, JSON.stringify(filteredObj, null, 2)) : console.log('deleteById(id): ', 'id doesn\'t found.');
        } catch (error) {
            console.log('deleteById(id): ', error);
        }
    }

    // Elimina todos los objetos presentes en el archivo.
    async deleteAll() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify([], null, 2))
        } catch (error) {
            console.log('deleteAll(): ', error);
        }
    }

    // Retorna un producto Random de la lista de productos
    async getRandomProduct() {
        try {
            const products = await this.getAll();
            console.log(products);
            const keys = Object.keys(products);
            console.log(keys);

            return products[keys[ keys.length * Math.random() << 0]];
        } catch (error) {
            console.log('deleteAll(): ', error);
        }
    }
}

module.exports = Contenedor;