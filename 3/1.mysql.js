const mysql = require('mysql2');

const connection = mysql.createConnection({
    host     : '127.0.0.1', // localhost 라고 치면 에러가 나요
    port     : '3306', 
    user     : 'root', 
    password : 'password', // 자신의 db password
    database : 'my_db' // 방금 생성했던 db 이름
  });

connection.connect();

connection.query('SELECT * from Users', (error, rows, fields) => {
  if (error) throw error;
  console.log('User info is: ', rows[0]);
});

connection.end();