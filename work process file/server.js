//si le devellopement de cette app devient plus important, il faudra passé par un serveur node pour facilité le dev 
//(mettre a jour le rendu sans 1000 manip)
let http = require('http');
let fs = require('fs');
let url = require('url');
 
let server = http.createServer();

server.on('request', (request, response) => {
    fs.readFile('./dest/index.html', (err, data) => {
        if(err) throw err;

        response.writeHead(200, {
            'content-type': 'text/html; charset=utf=8'
        })
        response.end(data)
    })
})
 
server.listen(process.env.PORT || 3000);