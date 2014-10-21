var url = require('url');

var PORT = (process.env.PORT || 8080);

var redis = require('socket.io-redis');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http, {transports: 'websocket'});

var nsp_app = io.of('/app');

io.adapter(redis(process.env.REDISCLOUD_URL));

var connections = 0;

nsp_app.on('connection', function(socket){
    connections ++;
    console.log('Connected to app', connections);

    socket.on('disconnect', function() {
        connections --;
        console.log('User disconnected', connections);
    });

});

http.listen(PORT, function(){
    console.log('Listening on *:' + PORT);
});
