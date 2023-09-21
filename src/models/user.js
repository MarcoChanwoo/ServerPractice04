import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
    username: String,
    hashedPassword: String,
});

// 인스턴스 메서드: 이 메서드를 통해 비밀번호를 파라미터로 받아(1) 계정의 hashedPassword값(2)으로 설정함
// 메서드 1:
UserSchema.methods.setPassword = async function (password) {
    const hash = await bcrypt.hash(password, 10);
    this.hashedPassword = hash;
};
// 메서드 2:
UserSchema.methods.checkPassword = async function (password) {
    const result = await bcrypt.compare(password, this.hashedPassword);
    return result; // true / false
};

// 스태틱 메서드: findByUsername 메서드를 통해 username으로 데이터를 찾게 함
UserSchema.statics.findByUsername = function (username) {
    return this.findOne({ username });
};

const User = mongoose.model('User', UserSchema);
export default User;