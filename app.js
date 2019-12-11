let express = require('express');
let bodyParser = require('body-parser');

var app = express()
    .use(bodyParser.raw());

app.get('/', (req, res)=>{
    res.status(200).send('It works!');
})

app.post('/scratch-file', (req, res)=>{
    let newFile = {
        name: req.param('fileName')
    }
    
    res.status(200).send(newFile);
})

let server = app.listen(2222, ()=>{
    let host = server.address().address;
    let port = server.address().port;
    
    console.log('Server listening at http://%s:$s', host, port);
})