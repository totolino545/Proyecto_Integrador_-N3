const fs = require('fs');
const path = require('path');
// const router = express.Router();
const ruta = path.join(__dirname, '../json/trailerflix.json');

function leer() {
    return new Promise((resolve, reject) => {
        fs.readFile(ruta, 'utf8', (error, result) => {
            if (error) reject(new Error('Error. No se puede leer'));

            resolve(JSON.parse(result));
        });
    });
}
function write(contenido, tabla, complemento, complementaria) {
    fs.writeFile(`../json/${tabla}.json`, JSON.stringify(contenido, null, '\t'), 'utf8', (error) => {
        if (error) {
            console.log('Error al agregar contenido en el archivo');
        }
    });
    fs.writeFile(`../json/${complementaria}.json`, JSON.stringify(complemento, null, '\t'), 'utf8', (error) => {
        if (error) {
            console.log('Error al agregar contenido en el archivo');
        }
    });
}

// eslint-disable-next-line max-lines-per-function
async function readAll() {
    const catalogo = await leer();
    const campos = ['genero', 'reparto', 'categorias'];
    const complementos = ['tags', 'actricesyactores', 'catalogo'];
    let campo = [];
    // eslint-disable-next-line max-lines-per-function
    campos.forEach((valor) => {
        const archivo = campos.indexOf(valor);
        let auxiliar = []; // array acumuladora de items
        let contenido = []; // array de Generos filtrados
        let complemento = []; // array de Actores filtrados
        let id = 1;
        let idc = 1;
        let ida = 1;
        catalogo.forEach((item) => {
            const tabla = valor; // constante nombre de json
            const complementaria = complementos[archivo]; // constante nombre de json
            if (Object.hasOwn(item, valor)) {
                switch (valor) {
                case 'genero': {
                    campo = item[valor].split(', ');
                    campo.forEach((value) => {
                        if (!auxiliar.includes(value)) {
                            auxiliar.push(value);
                            contenido.push({ Id: id++, genero: value });
                        }
                        const idcom = auxiliar.indexOf(value);
                        complemento.push({ Id: idc++, IdTitulo: item.id, Idgen: idcom + 1 });
                    });
                    write(contenido, `${tabla}s`, complemento, `catalogo_${complementaria}`);
                    delete item.genero;
                    break; }
                case 'reparto': {
                    campo = item[valor].split(', ');
                    campo.forEach((value) => {
                        if (!auxiliar.includes(valor)) {
                            auxiliar.push(value);
                            contenido.push({ Id: idc++, Actor: value });
                        }
                        const idcom = auxiliar.indexOf(value);
                        complemento.push({ Id: id++, IdTitulo: item.id, IdActor: idcom + 1 });
                    });
                    write(complemento, `catalogo_${tabla}`, contenido, complementaria);
                    delete item.reparto;
                    break; }
                case 'categorias': {
                    campo = item[valor].split(', ');
                    campo.forEach((value) => {
                        if (!auxiliar.includes(value)) {
                            auxiliar.push(value);
                            contenido.push({ Id: ida++, categoria: value });
                        }
                        complemento.push(item);
                    });
                    write(contenido, tabla, complemento, complementaria);
                    break; }
                default:
                }
            }
        });
    });
}

function init() {
    readAll();
}

init();

module.exports = { init };