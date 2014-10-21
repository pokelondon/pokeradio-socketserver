var url = require('url');
var redisURL = url.parse(process.env.REDISCLOUD_URL);

var PORT = (process.env.PORT || 8080);

var redis = require('socket.io-redis');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http, {transports: 'websocket'});

var nsp_app = io.of('/app');

if(process.env.REDISCLOUD_URL) {
    io.adapter(redis(process.env.REDISCLOUD_URL));
    console.log(process.env.REDISCLOUD_URL);
} else {
    io.adapter(redis({ host: config.redis_host, port: config.redis_port, db: config.redis_db }));
}

var connections = 0;

nsp_app.on('connection', function(socket){
    connections ++;
    console.log('Connected to app', connections);

    socket.on('disconnect', function() {
        connections --;
        console.log('User disconnected', connections);
        clearInterval(interval2);
    });

});

http.listen(PORT, function(){
    console.log('Listening on *:' + PORT);
});
