// http 모듈을 불러옴.
const http = require('http');

// 서버 설정을 위해 아이피 주소와 포트 번호를 상수로 선언함.
const hostname = '127.0.0.1';
const port = 80;

// 서버를 만들기 위해 http 모듈의 createServer 메소드를 이용함.
// 콜백 함수를 이용해 호출된 메소드가 실행될 때 함수를 실행시킴.
// 함수의 실행 내용은 서버가 response 패킷을 전송할 때 http 헤더에 상태코드 200과 평문임을 나타내는 타입을 지정해줌.
// 이후 response.end 메소드와 함께 response 패킷이 전송됨
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});


// 위에서 create된 erver를 구동시키기 위한 구문.
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
