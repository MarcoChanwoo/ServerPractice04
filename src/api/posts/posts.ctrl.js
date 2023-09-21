let postId = 1;

// posts 배열 초기 데이터
const posts = [
    {
        id: 1,
        title: '제목',
        body: '내용',
    },
];

/*  포스트 작성
    POST /api/posts
    { title, body }
*/
export const write = (ctx) => {
    // REST API의 Request Body는 ctx.request.body에서 조회할 수 있음
    const { title, body } = ctx.request.body;
    postId += 1;
    const post = { id: postId, title, body };
    posts.push(post);
    ctx.body = post;
};

export const list = (ctx) => {
    ctx.body = posts;
};

export const read = (ctx) => {
    const { id } = ctx.params;
    const post = posts.find((p) => p.id.toString() === id);
    if (!post) {
        ctx.status = 404;
        ctx.body = {
            message: '포스트가 존재하지 않음',
        };
        return;
    }
    ctx.body = post;
};

export const remove = (ctx) => {
    const { id } = ctx.params;
    const index = posts.findIndex((p) => p.id.toString() === id);
    if (index === -1) {
        ctx.status = 404;
        ctx.body = {
            message: '포스트가 존재하지 않음',
        };
        return;
    }
    posts.splice(index, 1);
    ctx.status = 204; // No Content
};

export const replace = (ctx) => {
    const { id } = ctx.params;
    const index = posts.findIndex((p) => p.id.toString() === id);
    if (index === -1) {
        ctx.status = 404;
        ctx.body = {
            message: '포스트가 존재하지 않음',
        };
        return;
    }
    posts[index] = {
        id,
        ...ctx.request.body,
    };
    ctx.body = posts[index];
};

export const update = (ctx) => {
    const { id } = ctx.params;
    const index = posts.findIndex((p) => p.id.toString() === id);
    if (index === -1) {
        ctx.status = 404;
        ctx.body = {
            message: '포스트가 존재하지 않음',
        };
        return;
    }
    posts[index] = {
        ...posts[index],
        ...ctx.request.body,
    };
    ctx.body = posts[index];
};
