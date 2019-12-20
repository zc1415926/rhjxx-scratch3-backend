let express = require('express');
let bodyParser = require('body-parser');
let fs = require('fs-extra');

var app = express()
    //设置文件大小限制：https://blog.csdn.net/qq_36060786/article/details/85238836
    .use(bodyParser.json({limit : "100mb"}));

//用中间件解决Scratch3提交时的跨域错误
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

    //把base64数据写入文件：https://cloud.tencent.com/developer/ask/61089
    var base64Data = req.body.fileData.replace("data:application/x.scratch.sb3;base64,", "");
    var binaryData = new Buffer.from(base64Data, 'base64').toString('binary');

    let fileFullPath = 'sb3Files/';
    fileFullPath += req.body.fileInfo[0] + '/' //年级id
                    + req.body.fileInfo[1] + '/' //课题id
                    + req.body.fileInfo[2] + '/' //班级id
                    + req.body.fileInfo[3] + '.sb3' //学生id.sb3
    /* 没有使用req.body.fileName（Scratch3文件名框中输入的文件名）因为可以是汉字等不易于保存的字符
    后期可以用于向数据库中保存文件信息。 */

    fs.outputFile(fileFullPath, binaryData, 'binary', err=>{
        if(err){
            console.log(err);
        }
        console.log('TODO:写入文件后测试写入是否成功，并向前端返回结果');
    })

    res.status(200).send('done');
})

let server = app.listen(2222, ()=>{
    let host = server.address().address;
    let port = server.address().port;
    
    console.log('Server listening at http://%s:$s', host, port);
})