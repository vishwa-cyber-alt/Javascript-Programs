const express = require('express');
app = express();

app.get('/', function (req, res) {
	res.type('text/plain');
	res.status(200);
	res.send('GeeksforGeeks');
});
app.get('/home', function (req, res) {
	res.type('text/plain');
	res.status(200);
	res.send('its a home directory');
});
app.get('/library',function(req,res) {
res.type('text/plain');
	res.status(200);
	res.send('its a library directory');
});
app.listen(4000, function () {
	console.log('Listening on port 4000 go to chrome type localhost:4000.....');
});
