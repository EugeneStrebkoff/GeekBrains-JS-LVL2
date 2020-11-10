//подключаем библиотеку для работы с http
const http = require('http');
//подключаем библиотеку для чтения файлов
const fs = require('fs');

const files = [
    './public/index.html',
    './public/style.css',
    './public/main.js'
]
const server = http.createServer((req, res) =>{
    console.log(req.url);

    const body = fs.readFileSync('./public/index.html');
    
    res.end(body);
});

server.listen(3000);

console.log('Server started');
