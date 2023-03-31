const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const dbconfig = require('./0.db-config.js');
const connection = mysql.createConnection(dbconfig);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// 데이터베이스 테이블 생성
connection.connect((err) => {
  if (err) {
    console.log('Error connecting to database.');
    return;
  }
  console.log('Connected to database.');

  const createTableQuery = `CREATE TABLE IF NOT EXISTS users (
                              id INT PRIMARY KEY AUTO_INCREMENT,
                              name VARCHAR(255),
                              email VARCHAR(255),
                              password VARCHAR(255),
                              phone VARCHAR(20))`;

  connection.query(createTableQuery, (err) => {
    if (err) {
      console.log('Error creating users table.');
      return;
    }
    console.log('Users table created.');
  });
});

// 전체 조회
app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err || results.length === 0) {
      console.log('Error getting users.');
      res.status(500).send(err);
      return;
    }
    console.log('Users retrieved.');
    res.send(results);
  });
});

// 특정 id 조회
app.get('/users/:id', (req, res) => {
  const id = req.params.id;

  connection.query('SELECT * FROM users where id=?', id, (err, results) => {
    if (err || results.length === 0) {
      console.log('Error getting users.');
      res.status(500).send(err);
      return;
    }
    console.log('Users retrieved.');
    res.send(results);
  });
});

// json 방식으로 user 생성
app.post('/users', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const phone = req.body.phone;

  connection.query('INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)', [name, email, password, phone], (err, results) => {
    if (err || results.length === 0) {
      console.log('Error creating user.');
      res.status(500).send(err);
      return;
    }
    console.log('User created.');
    res.send(results);
  });
});

// json 방식으로 user 수정
app.put('/users/:id', (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const phone = req.body.phone;

  connection.query('UPDATE users SET name=?, email=?, password=?, phone=? WHERE id=?', [name, email, password, phone, id], (err, results) => {
    if (err || results.length === 0) {
      console.log('Error updating user.');
      res.status(500).send(err);
      return;
    }
    console.log('User updated.');
    res.send(results);
  });
});

// 특정 id 삭제
app.delete('/users/:id', (req, res) => {
  const id = req.params.id;

  connection.query('DELETE FROM users WHERE id=?', [id], (err, results) => {
    if (err) {
      console.log('Error deleting user.');
      res.status(500).send(err);
      return;
    }
    console.log('User deleted.');
    res.send(results);
  });
});

// 로그인
app.post('/login', (req, res) => {
  const id = req.body.id;
  const email = req.body.email;
  const password = req.body.password;
  
  connection.query('SELECT * FROM users WHERE id=? AND email=? AND password=?', [id, email, password], (err, results) => {
    if (err || results.length === 0) {
      console.log('Error logging in.');
      res.status(500).send(err);
      return;
    } else if (results.length === 0) {
      res.status(404);
      console.log('No user found.');
      res.send('404 not found');
      return;
    }
    console.log('Logged in.');
    res.send(results);
  });
});
  
// 404 에러 처리
app.use((req, res) => {
  const error = new Error('Not found');
  error.status = 404;
});
  
// 500 에러 처리
app.use((error, req, res) => {
    res.status(error.status || 500).send({
    message: error.message,
    error: error
  });
});
  
// 서버 실행
const port = 3000;
app.listen(port, () => {
  console.log('server listening on port http://127.0.0.1:' + port);
});