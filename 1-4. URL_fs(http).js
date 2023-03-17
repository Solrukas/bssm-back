const http = require('http');
const fs = require('fs');
const port = 80;

const server = http.createServer((req, res) => {
  try {
    if (req.url === '/') {
      // index.html 파일 읽어들이기
      fs.readFile("./1-4/index.html", (err, data) => {
        if (err) throw err;
        res.writeHead(200, { 'Content-Type': 'text/html', 'charset': 'utf-8' });
        res.end(data);
      });

    } 
    else if (req.url === '/admin') { 
      // admin.js 파일 읽어들이기
      // admin.js는 브라우저에서만 동작하는 js 코드이기 때문에, alert가 실행되지 않음
      fs.readFile("./1-4/admin.js", (err, data) => {
        if (err) throw err;
        res.writeHead(200, { 'Content-Type': 'text/javascript', 'charset': 'utf-8' });
        res.end(data);
      });
      
    } 
    else {
      // 404 에러 처리
      res.write('404 Not Found');
      res.end();
    }
  } 
  catch (err) {
    res.end("404 Not Found");
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
