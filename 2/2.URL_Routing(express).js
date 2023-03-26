const express = require('express');
const app = express();
const port = 80;

// 루트 경로 요청 처리
app.get('/', (req, res) => {
  res.send('Hello World!!'); // 응답 메시지 작성
});

// /admin 경로 요청 처리
app.get('/admin', (req, res) => {
  res.send('Hello Admin!!!!!'); // 응답 메시지 작성
});

// 그 외 요청 처리
app.use((req, res) => {
  res.status(404).send('404 Not Found'); // 응답 메시지 작성 및 상태코드 전송
});

// 서버 실행
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
