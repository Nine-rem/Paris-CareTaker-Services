//import de index.php


const {readFile} = require('fs');
const {promisify} = require('util');
const readFileAsync = promisify(readFile);

const READ_OPTIONS = {encoding: 'UTF-8'};
const INDEX_URL = '../frontend/pages/index.php';
module.exports = async() => {
    const indexContent = await readFileAsync(INDEX_URL, READ_OPTIONS);
    return indexContent;

}