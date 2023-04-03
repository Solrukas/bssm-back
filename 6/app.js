const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');


// Express 앱 인스턴스 생성
const app = express();

// JSON 파싱을 위한 미들웨어 설정
app.use(express.json());

// Mongoose를 사용해 MongoDB에 연결 설정
mongoose.connect('mongodb://localhost:27017/test', {
    authSource: 'admin',
    user : 'root',
    pass : 'password',
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB')) // 연결 성공 시 메시지 출력
.catch((err) => console.error(err)); // 연결 실패 시 에러 출력


// 데이터 입력
app.post('/', async (req, res) => {
    const { username, email } = req.body;
    const user = new User({ username, email });
    
    // 중복 조회
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).send('User already exists');

    await user.save();
    res.status(200).send(user);
});

// 데이터 조회
app.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).send(users);
});

// 서버
app.listen(3000, () => {
    console.log('Server is running on http://127.0.0.1:3000');
});