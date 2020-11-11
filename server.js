//подключаем библиотеку для работы с http
const http = require('http');
const port = 3000;
//подключаем библиотеку для чтения файлов
const fs = require('fs');

const server = http.createServer((request, response) => {
    console.log(request.url);

    try {
        response.end(fs.readFileSync('./public' + request.url));
    } catch (err) {
        console.log(err.name + ': ' + err.message);
        response.end(fs.readFileSync('./public/index.html'));
    }

});

server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }

    console.log(`server is listening on ${port}`);
});