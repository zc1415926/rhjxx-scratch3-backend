let express = require('express');
let bodyParser = require('body-parser');

var app = express()
    .use(bodyParser.json());

// 中间件，应用的每个请求都会执行该中间件
/* app.use(function(req,res,next){
    res.header('Access-Control-Allow-Methods' , 'POST, GET');
    res.header('Access-Control-Allow-Credentials' , 'ture');
    next();
}) */

//解决Scratch3提交时的跨域错误
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/', (req, res)=>{
    res.status(200).send('It works!');
})

app.post('/scratch-file', (req, res)=>{
    //这里的req.body需要body-parser中间件
    let resInfo = 'File ' + req.body.fileName 
                + ' received, data: ' + req.body.data;

    res.status(200).send(resInfo);
})

let server = app.listen(2222, ()=>{
    let host = server.address().address;
    let port = server.address().port;
    
    console.log('Server listening at http://%s:$s', host, port);
})