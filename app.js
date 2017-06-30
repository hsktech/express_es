var express = require('express')
  , http    = require('http')
  , path    = require('path');

var bodyPaser = require('body-parser')
  , serveStatic  = require('serve-static');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(bodyPaser.urlencoded({ extended: false}));

app.use(bodyPaser.json());

app.use(serveStatic(path.join(__dirname, 'public')));

app.use(function(req, res, next){
    console.log('첫 번째 미들웨어에서 요청을 처리함');

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;

    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
    res.write('<div><p>Parm id : ' + paramId  + '</p></div>');
    res.write('<div><p>Parm password : ' + paramPassword  + '</p></div>');
    res.end();

});

// Express 서버 시작
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
