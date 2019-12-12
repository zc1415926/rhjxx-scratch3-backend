let express = require('express');
let bodyParser = require('body-parser');
let fs = require('fs');

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
    //这里的req.body需要body-parser中间件，req.body.fileData是sb3文件的实际base64数据。
    // console.log(req.body.fileData)

    //把base64数据写入文件，https://cloud.tencent.com/developer/ask/61089
    var base64Data = req.body.fileData.replace("data:application/x.scratch.sb3;base64,", "");
    var binaryData = new Buffer(base64Data, 'base64').toString('binary');
    fs.writeFile(req.body.fileName, binaryData, "binary", function(err) {
        if(err){
            throw err;
        }

        //TODO:写入文件后测试写入是否成功
    });

    res.status(200).send('done');
})

let server = app.listen(2222, ()=>{
    let host = server.address().address;
    let port = server.address().port;
    
    console.log('Server listening at http://%s:$s', host, port);
})