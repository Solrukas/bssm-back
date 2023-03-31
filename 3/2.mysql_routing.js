// MySQL DB 연결 후, Routing 처리
const express    = require('express');
const mysql      = require('mysql2');
const dbconfig   = require('./0.db-config.js');
const connection = mysql.createConnection(dbconfig);

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/users', (req, res) => {
  connection.query('SELECT * from Users', (error, rows) => {
    if (error) throw error;
    console.log('User info is: ', rows);
    res.send(rows);
  });
});

app.listen(port, () => {
  console.log('server listening on port http://127.0.0.1:' + port);
});