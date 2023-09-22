// 로그인 했을 시에만 API 사용 가능토록 하기
const checkLoggedIn = (ctx, next) => {
    if (!ctx.state.user) {
        ctx.state = 401; // Unauthorized
        return;
    }
    return next();
};

export default checkLoggedIn;
