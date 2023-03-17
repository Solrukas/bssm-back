const http = require('http');
const port = 80;

// HTTP 서버 생성
const server = http.createServer((req, res) => {
  
  // 요청 URL에 따라 응답 처리
  // 루트 경로 요청 처리
  if (req.url === '/') {
    res.write('Hello World!!'); // 응답 메시지 작성
    res.end(); // 응답 종료
  } 
  
  // /admin 경로 요청 처리
  else if (req.url === '/admin') {
    res.write('Hello Admin!!!!!'); // 응답 메시지 작성
    res.end(); // 응답 종료
  } 
  
  // 그 외 요청 처리
  else {
    res.write('404 Not Found'); // 응답 메시지 작성
    res.end(); // 응답 종료
  }
});

// 서버 실행
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
