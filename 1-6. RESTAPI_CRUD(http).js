const http = require('http');
const port = 80;

let users = [
  { id: 1, name: 'jw', email: 'jw@example.com' },
  { id: 2, name: 'non', email: 'non@example.com' },
  { id: 3, name: 'hi', email: 'hi@example.com' }
];

const server = http.createServer((req, res) => {
  // 전체 값 조회
  if (req.method === 'GET' && req.url === '/users') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(users));
  } 
  
  // 특정 사용자 조회
  else if (req.method === 'GET' && req.url.match(/\/users\/\d+/)) {
    const id = parseInt(req.url.split('/')[2]);
    const user = users.find(u => u.id === id);
    if (!user) {
      res.statusCode = 404;
      res.end('해당 사용자를 찾을 수 없습니다.');
    } 
    else {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(user));
    }
  } 
  
  // 사용자 등록
  else if (req.method === 'POST' && req.url === '/users') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const user = JSON.parse(body);
      user.id = users.length + 1;
      users.push(user);
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(user));
    });
  } 
  
  // 사용자 수정
  else if (req.method === 'PUT' && req.url.match(/\/users\/\d+/)) {
    const id = parseInt(req.url.split('/')[2]);
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      res.statusCode = 404;
      res.end('해당 사용자를 찾을 수 없습니다.');
    } 
    else {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        const user = JSON.parse(body);
        user.id = id;
        users[userIndex] = user;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(user));
      });
    }
  } 
  
  // 사용자 삭제
  else if (req.method === 'DELETE' && req.url.match(/\/users\/\d+/)) {
    const id = parseInt(req.url.split('/')[2]);
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      res.statusCode = 404;
      res.end('해당 사용자를 찾을 수 없습니다.');
    } 
    else {
      users.splice(userIndex, 1);
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: '사용자가 삭제되었습니다.' }));
    }
  } 
  
  else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
