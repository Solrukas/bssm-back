const express = require('express');

// 사용자 정보 객체
const users = {
  'user1': 'password1',
  'user2': 'password2',
  'user3': 'password3',
};

const app = express();
const port = 80;

// POST 요청 데이터 파싱
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// POST /login 라우팅 핸들러
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // 사용자 정보 확인 후 응답 처리
  if (username in users && users[username] === password) {
    res.status(200).end('Login success!');
  } else {
    res.status(401).end('Unauthorized');
  }
});

// 404 에러 처리
app.use((req, res) => {
  res.status(404).end('Not Found');
});

// 서버 실행
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
