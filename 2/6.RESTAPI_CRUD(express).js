const express = require('express');
const app = express();
const port = 80;

// 사용자 데이터를 담을 배열을 선언합니다.
let users = [
  { id: 1, name: 'jw', email: 'jw@example.com' },
  { id: 2, name: 'non', email: 'non@example.com' },
  { id: 3, name: 'hi', email: 'hi@example.com' }
];

app.use(express.json());

// 모든 사용자 조회 API
app.get('/users', (req, res) => {
  res.json(users);
});

// 특정 사용자 조회 API
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) {
    res.status(404).send('해당 사용자를 찾을 수 없습니다.');
  } else {
    res.json(user);
  }
});

// 사용자 등록 API
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    res.status(400).send('name and email are required');
    return;
  }

  const user = { name, email, id: users.length + 1 };
  users.push(user);
  res.json(user);
});



// 사용자 수정 API
app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === id);
  if (userIndex === -1) {
    res.status(404).send('해당 사용자를 찾을 수 없습니다.');
  } else {
    const user = req.body;
    user.id = id;
    users[userIndex] = user;
    res.json(user);
  }
});

// 사용자 삭제 API
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === id);
  if (userIndex === -1) {
    res.status(404).send('해당 사용자를 찾을 수 없습니다.');
  } else {
    users.splice(userIndex, 1);
    res.json({ message: '사용자가 삭제되었습니다.' });
  }
});

// 404 에러 핸들링 미들웨어
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// 서버 실행
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
