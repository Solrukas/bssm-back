const express = require('express');
const app = express();

const port = 80;

// /hello 경로에 대한 요청 처리
app.get('/hello', (req, res) => {
  const name = req.query.name || 'World'; // 쿼리 문자열에서 name 값을 추출
  res.type('text/plain');
  res.send(`Hello, ${name}!`);
});

// 그 외의 경로에 대한 요청 처리
app.use((req, res) => {
  res.status(404).type('text/plain').send('404 Not Found');
});

// Express 서버 실행
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
