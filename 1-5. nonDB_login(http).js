const http = require('http');

const users = {
  'user1': 'password1',
  'user2': 'password2',
  'user3': 'password3',
};

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/login') {
    let body = '';
    req.on('data', chunk => { // 리퀘스트로 받은 데이터를 바디 변수 내에 문자열을 청크 단위로 데이터 추가
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const data = JSON.parse(body); // JSON / FORM 방식 등 편한 방식으로 진행 -> querystring을 이용한 formdata 방식 이용 법 등
        const { username, password } = data;
        if (users[username] && users[username] === password) {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('Login success!');
        } 
        else {
          res.writeHead(401, { 'Content-Type': 'text/plain' });
          res.end('Unauthorized');
        }
      } 
      catch (error) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Bad Request');
      }
    });
  } 
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const port = 80;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});