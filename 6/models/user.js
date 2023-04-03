// 필요한 모듈 불러오기
const mongoose = require('mongoose');

// 사용자 스키마 정의
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, // 사용자 이름 (필수, 고유)
    email: { type: String, required: true }, // 이메일 (필수)
});

// 스키마를 사용하여 모델 생성
const User = mongoose.model('User', UserSchema);
// 모델 내보내기
module.exports = User;