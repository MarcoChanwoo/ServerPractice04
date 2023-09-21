import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';

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
// serialize라는 인스턴스 함수로 만듦; hashedPassword 필드가 응답되지 않도록 데이터를 JSON으로 변환한 다음
// delete를 통해 해당 필드를 지웠음. 자주 이용되므로 인스턴스로 제작함
UserSchema.methods.serialize = function () {
    const data = this.toJSON();
    delete data.hashedPassword;
    return data;
};

UserSchema.methods.generateToken = function () {
    const token = Jwt.sign(
        // 첫 번째 파라미터에는 토큰 안에 집어넣고 싶은 데이터를 넣음
        {
            _id: this._id,
            username: this.username,
        },
        process.env.JWT_SECRET, // 두 번째 파라미터에는 JWT 암호를 넣음
        {
            expiresIn: '7d',
        },
    );
    return token;
};

// 스태틱 메서드: findByUsername 메서드를 통해 username으로 데이터를 찾게 함
UserSchema.statics.findByUsername = function (username) {
    return this.findOne({ username });
};

const User = mongoose.model('User', UserSchema);
export default User;
