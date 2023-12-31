import Jwt from 'jsonwebtoken';

const jwtMiddleware = (ctx, next) => {
    const token = ctx.cookies.get('access_token');
    if (!token) return next(); // 토큰이 없는 경우
    try {
        const decoded = Jwt.verify(token, process.env.JWT_SECRET);
        ctx.state.user = {
            _id: decoded._id,
            username: decoded.username,
        };
        console.log(decoded);
        return next();
    } catch (e) {
        // 토큰 검증 실패
        return next();
    }
};

export default jwtMiddleware;
