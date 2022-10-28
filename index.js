var express = require('express');
var request = require('request');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static('public'));
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    var dataPusher = setInterval(function () {
request.get('http://[aaaa::212:7402:2:202]/',function
(err,res,body){
            if(err){
                console.log(err);
                return;
            }
	   console.log(body);
            var obj = JSON.parse(body);
            socket.broadcast.emit('data', obj);
        });
    }, 3000);
    socket.on('disconnect', function() {
        console.log('closing');
    });
});
http.listen(3000, function(){
    console.log('listening on *:3000');
});
