// Importamos la librería de MongoDB y la clase Database definida previamente
const { MongoClient } = require('mongodb');
const Database = require('../config/mongodb.js');

// Creamos una instancia de la clase Database
this.db = new Database();

// Función asincrónica para crear un documento en una colección específica
async function createDocument(collection, data) {
	console.log(collection, data);

	try {
		// Verificamos si la conexión a la base de datos ya está establecida
		if (!this.db[collection]) {
			await this.db.connectToDatabase();
		}

		// Insertamos un documento en la colección especificada
		return this.db[collection].insertOne(data);
	} catch (error) {
		// En caso de error, lanzamos una excepción
		throw error;
	}
}
// funcion para buscar todo

async function allDocument(collection,query={}) {
	try {
		if (!this.db[collection]) {
			await this.db.connectToDatabase();
		}
		console.log(collection,query);
		const document = await this.db[collection].find(query).toArray();
		return document;
	} catch (e) {
		console.error(e);
	}
}

//funcion para buscar por parametro

async function getOneDocument(collection, query) {
	try {
		if (!this.db[collection]) {
			await this.db.connectToDatabase();
		}
		const document = await this.db[collection].findOne(query);
		return document;
	} catch (e) {
		console.error(e);
	}
}

async function UpdateDocument(collection, filter, dataUpdate) {
    try {
        if (!this.db[collection]) {
            await this.db.connectToDatabase(); //-->
        }
        const document = await this.db[collection].updateOne(filter, 
            {
                $set:dataUpdate
            });
        return document;
    } catch (e) {
        console.error(e);
    }
}

async function deleteDocument(collection, filter) {
    try {
        if (!this.db[collection]) {
            await this.db.connectToDatabase();
        }
        const result = await this.db[collection].deleteOne(filter);
        return result;
    } catch (e) {
        console.error(e);
    }
}



module.exports = { createDocument, allDocument, getOneDocument, UpdateDocument, deleteDocument };
