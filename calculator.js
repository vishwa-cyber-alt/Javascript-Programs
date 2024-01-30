const express = require('express');
const app = express();
var a = 123;
var b = 34;
var add = a + b;
var sub=a-b;
var mul=a*b;

app.get('/', function (req, res) {
    res.type('text/plain');
    res.status(200);
    res.send('GeeksforGeeks');
});


app.get('/add', function (req, res) {
    res.type('text/plain');
    res.status(200);
    res.send('addition='+add);
});

app.get('/sub', function (req, res) {
    res.type('text/plain');
    res.status(200);
    res.send('subtraction='+sub);
});
app.get('/mul', function (req, res) {
    res.type('text/plain');
    res.status(200);
    res.send('multiplication='+mul);
});

app.listen(4000, function () {
    console.log('Listening on port 4000, go to Chrome and type localhost:4000...');
});
