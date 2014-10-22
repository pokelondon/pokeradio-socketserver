var url = require('url');
var redisURL = url.parse(process.env.REDISCLOUD_URL || 'redis://localhost:6379/1');

var PORT = (process.env.PORT || 8080);

var redisAdapter = require('socket.io-redis');
var redis = require('redis')
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http, {transports: 'websocket'});

var nsp_app = io.of('/app');

if(redisURL.auth) {
    redisURL.password = redisURL.auth.split(':')[1];

    var pub = redis.createClient(redisURL.port, redisURL.hostname, {auth_pass: redisURL.password});
    var sub = redis.createClient(redisURL.port, redisURL.hostname, {auth_pass: redisURL.password, detect_buffers: true});

    io.adapter(redisAdapter({pubClient: pub, subClient: sub}));
} else {
    io.adapter(redisAdapter(redisURL.hostname, redisURL.port));
}

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
