const express = require('express');
const app = express();
const fs = require('fs');

const port = 80;

// '/' 경로 처리
app.get('/', (req, res) => {
  fs.readFile('./4/index.html', (err, data) => {
    if (err) {
      res.status(404).end('404 Not Found');
      return;
    }

    res.status(200).end(data);
  });
});

// '/admin' 경로 처리
app.get('/admin', (req, res) => {
  fs.readFile('./4/admin.js', (err, data) => {
    if (err) {
      res.status(404).end('404 Not Found');
      return;
    }

    res.status(200).end(data);
  });
});

// 모든 요청에 대해 404 에러 처리
app.use((req, res) => {
  res.status(404).end('404 Not Found');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
