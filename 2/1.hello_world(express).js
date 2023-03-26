// Express 모듈을 불러옴
const express = require('express');

// express 애플리케이션 객체를 생성
const app = express();

// 서버 설정을 위해 아이피 주소와 포트 번호를 상수로 선언함.
const hostname = '127.0.0.1';
const port = 80;

// 라우트 설정
app.get('/', (req, res) => {
  // http 헤더에 상태코드 200과 평문임을 나타내는 타입을 지정해줌
  res.status(200).send('Hello, World!');
});

// 서버를 구동시키기 위한 구문.
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
