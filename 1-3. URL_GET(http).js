const http = require('http');
const url = require('url');

const port = 80;

// HTTP 서버 생성
const server = http.createServer((req, res) => {
  // URL에서 경로와 쿼리 추출
  const { pathname, query } = url.parse(req.url, true);

  // /hello 경로에 대한 요청 처리
  if (pathname === '/hello') {
    const name = query.name || 'World'; // 쿼리 문자열에서 name 값을 추출
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Hello, ${name}!`);
  } 
  
  // 그 외의 경로에 대한 요청 처리
  else { 
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

// HTTP 서버 실행
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});