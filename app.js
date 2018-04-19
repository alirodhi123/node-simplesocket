const app = require('express')();
const http = require('http').Server(app).listen(3000);
const io = require('socket.io')(http);

console.log('[+] Server Started');

app.get('/', function(req, res, next){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	console.log('[+] A user is connected..');
	
	socket.on('message', function(data){
		console.log('[+] Received from : ' + data);
		socket.emit('sendres', data);
	});

	socket.on('disconnect', function(){
		console.log('[+] A user is disconnected!');
	});
});



module.exports = app;